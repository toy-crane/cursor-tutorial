"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button"; // 사용하지 않으므로 주석 처리 또는 삭제
import { Label } from "@/components/ui/label";
// import { useState } from "react"; // 사용하지 않으므로 주석 처리 또는 삭제

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
  // const [selectedColor, setSelectedColor] = useState("#ffffff"); // 사용하지 않으므로 주석 처리 또는 삭제

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <h1 className="text-3xl font-bold mb-8 text-foreground">
        WIFI QR 코드 카드 생성
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-md"
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

        {/* 제출 버튼 (추후 기능 구현 시 활용) */}
        {/*
        <Button type="submit" className="w-full">
          미리보기 생성 (임시)
        </Button>
         */}
      </form>
      {/* 카드 미리보기 영역 (다음 Task에서 구현) */}
      {/*
       <div className="mt-8 w-full max-w-md p-8 rounded-lg shadow-md" style={{ backgroundColor: watchedBgColor }}>
          카드 미리보기
       </div>
       */}
    </div>
  );
}
