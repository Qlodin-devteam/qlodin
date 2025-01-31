import { SignOutWrapper } from "@/components/hoc";
import { MainLayoutResponsiveWrapper } from "@/components/mainLayout";

export default function Page() {
  return (
    <MainLayoutResponsiveWrapper>
      <SignOutWrapper>
        <div className="bg-gray-100 rounded-xl app-container py-10 mx-4 mt-10">
          <p className="font-semibold font-playfair text-lg md:text-2xl">
            Signing You Out...
          </p>
        </div>
      </SignOutWrapper>
    </MainLayoutResponsiveWrapper>
  );
}
