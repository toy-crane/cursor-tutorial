import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gradient-to-b from-background to-secondary dark:from-card dark:to-secondary">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
        Cursor Tutorial
      </h1>
      <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-lg text-center leading-relaxed">
        이 곳에서 당신의 멋진 여정이 시작됩니다.
        <br />
        아래 버튼을 클릭하여 시작해보세요.
      </p>
      <div className="flex gap-4">
        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
          시작하기
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all"
        >
          더 알아보기
        </Button>
      </div>
    </div>
  );
}
