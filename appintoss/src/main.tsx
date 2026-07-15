import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { getTossShareLink, saveBase64Data, share } from "@apps-in-toss/web-framework";
import App, { type SlangiSavePayload, type SlangiSharePayload } from "../../app/page";
import "../../app/globals.css";

const SHARE_IMAGE_URL = "https://static.toss.im/appsintoss/58641/58ba40e2-2d26-43cc-8805-d8df0ef64372.png";

async function shareSlangiResult(result: SlangiSharePayload) {
  const tossLink = await getTossShareLink("intoss://solquishy", SHARE_IMAGE_URL);
  await share({
    message: `나는 ${result.name}!\n${result.short}\n\n너는 무슨 슬랑이인지 확인해봐!\n${tossLink}`,
  });
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

function loadResultImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("RESULT_IMAGE_LOAD_FAILED"));
    image.src = source;
  });
}

function drawDetailCard(
  context: CanvasRenderingContext2D,
  x: number,
  label: string,
  value: string,
) {
  context.fillStyle = "#fff8ed";
  roundedRect(context, x, 995, 410, 170, 28);
  context.fill();

  context.textAlign = "left";
  context.fillStyle = "#b17762";
  context.font = "900 23px sans-serif";
  context.fillText(label, x + 30, 1040);

  context.fillStyle = "#3c211b";
  context.font = "800 25px sans-serif";
  wrapText(context, value, 350, 3).forEach((line, index) => {
    context.fillText(line, x + 30, 1082 + index * 34);
  });
}

async function makeResultCard(result: SlangiSavePayload) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("CANVAS_NOT_SUPPORTED");

  const background = context.createLinearGradient(0, 0, 1080, 1350);
  background.addColorStop(0, "#fffaf0");
  background.addColorStop(1, "#f2dfc7");
  context.fillStyle = background;
  context.fillRect(0, 0, 1080, 1350);

  context.fillStyle = "rgba(255,255,255,.88)";
  roundedRect(context, 62, 60, 956, 1230, 58);
  context.fill();

  context.fillStyle = "#3c211b";
  context.font = "800 28px sans-serif";
  context.textAlign = "left";
  context.fillText("SLANGI LAB · RESULT CARD", 115, 125);

  context.fillStyle = result.color;
  context.beginPath();
  context.arc(540, 340, 215, 0, Math.PI * 2);
  context.globalAlpha = 0.15;
  context.fill();
  context.globalAlpha = 1;

  const character = await loadResultImage(result.image);
  const scale = Math.min(460 / character.naturalWidth, 390 / character.naturalHeight);
  const imageWidth = character.naturalWidth * scale;
  const imageHeight = character.naturalHeight * scale;
  context.drawImage(character, (1080 - imageWidth) / 2, 145 + (390 - imageHeight) / 2, imageWidth, imageHeight);

  context.textAlign = "center";
  context.fillStyle = result.color;
  context.font = "900 60px sans-serif";
  context.fillText(result.name, 540, 625);

  context.fillStyle = "#5d4037";
  context.font = "700 29px sans-serif";
  wrapText(context, result.short, 820, 2).forEach((line, index) => context.fillText(line, 540, 680 + index * 40));

  context.font = "700 24px sans-serif";
  let tagX = 540 - result.tags.reduce((sum, tag) => sum + context.measureText(tag).width + 52, 0) / 2;
  for (const tag of result.tags) {
    const tagWidth = context.measureText(tag).width + 36;
    context.fillStyle = "#f4e7d7";
    roundedRect(context, tagX, 755, tagWidth, 48, 24);
    context.fill();
    context.fillStyle = "#7c6153";
    context.textAlign = "left";
    context.fillText(tag, tagX + 18, 788);
    tagX += tagWidth + 16;
  }

  context.textAlign = "center";
  context.fillStyle = "#6e574b";
  context.font = "600 25px sans-serif";
  wrapText(context, result.description, 820, 4).forEach((line, index) => context.fillText(line, 540, 855 + index * 36));

  drawDetailCard(context, 115, "나만의 말랑 파워", result.strength);
  drawDetailCard(context, 555, "찰떡 슬랑이", result.match);

  context.textAlign = "center";
  context.fillStyle = "#a07b68";
  context.font = "700 22px sans-serif";
  context.fillText("난 무슨 슬랑이일까? · solquishy", 540, 1235);

  return canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");
}

async function saveSlangiResult(result: SlangiSavePayload) {
  const data = await makeResultCard(result);
  await saveBase64Data({
    data,
    fileName: `slangi-result-${Date.now()}.png`,
    mimeType: "image/png",
  });
}

declare global {
  interface Window {
    __slangiBootTimer?: number;
  }
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("ROOT_NOT_FOUND");
}

if (window.__slangiBootTimer) {
  window.clearTimeout(window.__slangiBootTimer);
}

createRoot(root).render(
  <StrictMode>
    <App onShareResult={shareSlangiResult} onSaveResultImage={saveSlangiResult} />
  </StrictMode>,
);
