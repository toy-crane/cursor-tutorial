"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas-pro";

// Zod 스키마 정의 (유효성 검사 규칙)
const formSchema = z.object({
  brandName: z.string().min(1, "브랜드 이름을 입력해주세요."),
  ssid: z.string().min(1, "네트워크 이름(SSID)을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
  bgColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "올바른 HEX 색상 코드를 입력해주세요."), // 기본 HEX 색상 코드 형식 검사
});

// 폼 데이터 타입 정의
type WifiFormData = z.infer<typeof formSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<WifiFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brandName: "",
      ssid: "",
      password: "",
      bgColor: "#ffffff", // 기본값 설정
    },
  });

  // 폼 제출 핸들러 (현재는 콘솔 출력만)
  const onSubmit: SubmitHandler<WifiFormData> = (data) => {
    console.log(data);
    // 추후 QR 코드 생성 및 카드 미리보기 로직 추가
  };

  // 배경색 변경 감지
  const watchedBgColor = watch("bgColor");
  // SSID와 비밀번호 변경 감지
  const watchedSsid = watch("ssid");
  const watchedPassword = watch("password");
  // 브랜드 이름 변경 감지
  const watchedBrandName = watch("brandName");

  // WIFI QR 코드 문자열 생성
  const wifiString = `WIFI:S:${watchedSsid};T:WPA;P:${watchedPassword};;`;

  // 이미지 다운로드 함수
  const handleDownload = async () => {
    const cardElement = document.querySelector("#wifi-card") as HTMLDivElement;
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: null, // 배경을 투명하게 설정
        scale: 2, // 해상도를 2배로 증가
        useCORS: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector(
            "#wifi-card"
          ) as HTMLElement;
          if (clonedElement) {
            clonedElement.style.fontFamily =
              "system-ui, -apple-system, sans-serif";
          }
        },
      });
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${watchedBrandName || "wifi"}-qr-card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("이미지 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-3xl font-bold mb-4 text-foreground">
        WIFI QR 코드 카드 생성
      </h1>

      {/* 카드 미리보기 영역 */}
      <div
        id="wifi-card"
        className="mb-8 w-64 p-6 rounded-lg border border-border flex flex-col items-center relative justify-between [aspect-ratio:3/4] font-sans"
        style={{ backgroundColor: watchedBgColor }}
      >
        {/* 상단 제목 */}
        <h2 className="text-xl font-semibold absolute top-6 text-foreground font-sans">
          WIFI 접속
        </h2>

        {/* 중앙 QR 코드 또는 안내 텍스트 */}
        <div className="flex-grow flex items-center justify-center w-full">
          {watchedSsid && watchedPassword ? (
            <QRCodeCanvas
              value={wifiString}
              size={208}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
            />
          ) : (
            <p className="text-center text-sm opacity-80 px-4 text-foreground">
              SSID와 비밀번호를 입력하면
              <br />
              QR 코드가 생성됩니다.
            </p>
          )}
        </div>

        {/* 하단 브랜드 이름 */}
        <p className="text-lg absolute bottom-6 text-foreground">
          {watchedBrandName}
        </p>

        {/* 하단 오른쪽 레이블 */}
        <p className="text-xs absolute bottom-3 right-3 opacity-70 text-foreground">
          by toycrane
        </p>
      </div>

      {/* 다운로드 버튼 */}
      {watchedSsid && watchedPassword && (
        <Button onClick={handleDownload} className="mb-8" variant="outline">
          이미지로 저장
        </Button>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg"
      >
        {/* 브랜드 이름 */}
        <div className="space-y-2">
          <Label htmlFor="brandName" className="text-card-foreground">
            브랜드 이름
          </Label>
          <Input
            id="brandName"
            placeholder="예: My Cafe"
            {...register("brandName")}
          />
          {errors.brandName && (
            <p className="text-sm text-destructive">
              {errors.brandName.message}
            </p>
          )}
        </div>

        {/* 네트워크 이름 (SSID) */}
        <div className="space-y-2">
          <Label htmlFor="ssid" className="text-card-foreground">
            네트워크 이름 (SSID)
          </Label>
          <Input
            id="ssid"
            placeholder="예: MyCafe_WiFi"
            {...register("ssid")}
          />
          {errors.ssid && (
            <p className="text-sm text-destructive">{errors.ssid.message}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-card-foreground">
            비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="WIFI 비밀번호"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 배경색 선택 */}
        <div className="space-y-2">
          <Label htmlFor="bgColor" className="text-card-foreground">
            카드 배경색
          </Label>
          <div className="relative flex items-center gap-2">
            <Label
              htmlFor="bgColor"
              className="flex items-center gap-2 cursor-pointer"
            >
              <Input
                id="bgColor"
                type="color"
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                {...register("bgColor")}
                value={watchedBgColor}
              />
              <div
                className="w-6 h-6 rounded-full border border-input"
                style={{ backgroundColor: watchedBgColor }}
              />
              <span className="text-sm text-muted-foreground">
                {watchedBgColor}
              </span>
            </Label>
          </div>
          {errors.bgColor && (
            <p className="text-sm text-destructive">{errors.bgColor.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
