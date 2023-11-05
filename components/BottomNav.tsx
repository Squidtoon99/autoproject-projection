import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AnimatedLink from "@/components/AnimatedLink";

const BottomNav = () => {
    return <div id="bottom-nav" className='flex flex-row flex-wrap justify-between items-center w-2/3 mx-auto'>
        <Separator className="w-[35%] bg-foreground/25" />
        <div className="flex flex-row">
            <Button variant={"secondary"} className="rounded-l-full rounded-r-none">{"<"}</Button>
            <Button variant={"secondary"} className="rounded-r-full rounded-l-none">{">"}</Button>
        </div>
       <Separator className="w-[35%] bg-foreground/25" />
    </div>
};


export default BottomNav;