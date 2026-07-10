import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://slangi-mind-test.gksthf7894.chatgpt.site"),
  title: "나는 무슨 슬랑이일까? | 말랑이 심리테스트",
  description: "크런치 땅콩부터 딸기 철푸덕까지, 모양과 촉감이 전부 다른 나의 슬랑이를 찾아보세요!",
  openGraph: {
    title: "나는 무슨 슬랑이일까?",
    description: "모양도 촉감도 성격도 전부 다른 여섯 친구 중 나의 말랑 본체는?",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 806, alt: "나는 무슨 슬랑이일까?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "나는 무슨 슬랑이일까?",
    description: "나와 닮은 말랑 본체를 찾아보세요.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
