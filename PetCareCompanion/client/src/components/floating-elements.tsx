import { Heart, Bone, Dog, Cat, PawPrint } from "lucide-react";

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="floating-element absolute top-20 left-10 text-primary-blue opacity-20">
        <PawPrint className="h-16 w-16" />
      </div>
      <div className="floating-element absolute top-40 right-20 text-primary-green opacity-15">
        <Bone className="h-12 w-12" />
      </div>
      <div className="floating-element absolute bottom-40 left-20 text-primary-orange opacity-25">
        <Dog className="h-14 w-14" />
      </div>
      <div className="floating-element absolute bottom-20 right-10 text-primary-blue opacity-20">
        <Cat className="h-12 w-12" />
      </div>
      <div className="floating-element absolute top-60 left-1/2 text-primary-green opacity-15">
        <Heart className="h-10 w-10" />
      </div>
      <div className="floating-element absolute top-32 right-1/3 text-primary-orange opacity-20">
        <PawPrint className="h-12 w-12" />
      </div>
      <div className="floating-element absolute bottom-32 left-1/3 text-primary-blue opacity-15">
        <Heart className="h-8 w-8" />
      </div>
      <div className="floating-element absolute top-1/2 right-16 text-primary-green opacity-20">
        <Dog className="h-10 w-10" />
      </div>
    </div>
  );
}
