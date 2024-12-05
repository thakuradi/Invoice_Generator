import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
      <Image
    src="/NEXAWINGSelement.png"
    alt="Nexawings Element"
    width={100} // Replace with the actual width
    height={100} // Replace with the actual height
  />
        <h3 className="text-3xl font-semibold">
          Invoice<span className="text-blue-500">NexaWings</span>
        </h3>
      </Link>
      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
