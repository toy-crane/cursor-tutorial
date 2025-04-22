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

export default function Home() {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        WIFI QR 코드 카드 생성
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        {/* 브랜드 이름 */}
        <div className="space-y-2">
          <Label
            htmlFor="brandName"
            className="text-gray-700 dark:text-gray-300"
          >
            브랜드 이름
          </Label>
          <Input
            id="brandName"
            placeholder="예: My Cafe"
            {...register("brandName")}
            className="dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.brandName && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.brandName.message}
            </p>
          )}
        </div>

        {/* 네트워크 이름 (SSID) */}
        <div className="space-y-2">
          <Label htmlFor="ssid" className="text-gray-700 dark:text-gray-300">
            네트워크 이름 (SSID)
          </Label>
          <Input
            id="ssid"
            placeholder="예: MyCafe_WiFi"
            {...register("ssid")}
            className="dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.ssid && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.ssid.message}
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-300"
          >
            비밀번호
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="WIFI 비밀번호"
            {...register("password")}
            className="dark:bg-gray-700 dark:text-gray-200"
          />
          {errors.password && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* 배경색 선택 */}
        <div className="space-y-2">
          <Label htmlFor="bgColor" className="text-gray-700 dark:text-gray-300">
            카드 배경색
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="bgColor"
              type="color"
              {...register("bgColor")}
              className="p-1 h-10 w-14 block bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
              value={watchedBgColor} // react-hook-form 상태와 동기화
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {watchedBgColor}
            </span>
          </div>
          {errors.bgColor && (
            <p className="text-sm text-red-500 dark:text-red-400">
              {errors.bgColor.message}
            </p>
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
