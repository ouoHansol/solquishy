import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나는 무슨 슬랑이일까? | 말랑이 심리테스트",
  description: "8가지 상황으로 알아보는 나의 말랑 본체. 나와 꼭 닮은 슬랑이 친구를 찾아보세요!",
  openGraph: {
    title: "나는 무슨 슬랑이일까?",
    description: "눌리면 모양은 변해도 매력은 그대로! 나의 말랑 본체를 찾아보세요.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
