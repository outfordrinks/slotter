import { FigmaInput } from '@/components/FigmaInput';
import { FigmaPreview } from '@/components/Preview/FigmaPreview';

export function EditorPage() {
  console.log('EditorPage mounted');

  return (
    <div className="grid grid-cols-3 h-screen">
      {/* Left sidebar - takes 1 column */}
      <div className="p-4 border-r bg-background">
        <FigmaInput />
      </div>

      {/* Main content area - takes 2 columns */}
      <div className="col-span-2 p-4 flex items-center justify-center">
        <FigmaPreview className="w-full h-full" />
      </div>
    </div>
  );
} 