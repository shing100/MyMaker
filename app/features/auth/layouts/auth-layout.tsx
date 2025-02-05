import { Outlet } from "react-router";
import { BlurFade } from "~/common/components/ui/blur-fade";
import { FlickeringGrid } from "~/common/components/ui/flickering-grid";

export default function AuthLayout() {
    return <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div className="bg-gradient-to-br from-primary to-secondary hidden lg:block">
            <div className="flex flex-col gap-2 absolute top-20 left-20">
                <BlurFade delay={0.25} inView>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        Hello MyMaker 👋
                    </h2>
                </BlurFade>
                <BlurFade delay={0.25 * 2} inView>
                    <span className="text-pretty text-xl tracking-tighter sm:text-3xl xl:text-4xl/none">
                        Nice to meet you
                    </span>
                </BlurFade>
            </div>
            <FlickeringGrid squareSize={4} gridGap={5} maxOpacity={0.5} flickerChance={0.2} color="#0577f9" />
        </div>
        <Outlet />
    </div>;
} 