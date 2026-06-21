import { cn } from "@/lib/utils";

interface ImageSource {
  src: string;
  alt: string;
}

interface ShowImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
}

function RevealImageListItem({ text, images }: ShowImageListItemProps) {
  const container =
    "absolute right-4 top-6 z-40 h-20 w-16 sm:right-8 sm:top-8 sm:h-24 sm:w-20 lg:right-12 lg:top-10 lg:h-32 lg:w-28";
  const effect =
    "relative h-full w-full scale-0 overflow-hidden rounded-md opacity-0 shadow-none transition-all delay-100 duration-500 group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-xl";

  return (
    <div className="group relative w-full overflow-visible border-b border-border/60 py-6 sm:py-8 lg:py-10">
      <h4 className="mono pr-24 font-display text-[clamp(2rem,6vw,4.75rem)] font-black leading-none text-text-primary transition-all duration-500 group-hover:opacity-40 sm:pr-32 lg:pr-48">
        {text}
      </h4>
      <div className={container}>
        <div className={effect}>
          <img
            alt={images[1].alt}
            src={images[1].src}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div
        className={cn(
          container,
          "rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12",
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img
            alt={images[0].alt}
            src={images[0].src}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function RevealImageList() {
  const items: ShowImageListItemProps[] = [
    {
      text: "Web Development",
      images: [
        {
          src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=240&auto=format&fit=crop&q=70",
          alt: "Code editor on a web development workstation",
        },
        {
          src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=240&auto=format&fit=crop&q=70",
          alt: "Developer building a responsive website",
        },
      ],
    },
    {
      text: "UI/UX Design",
      images: [
        {
          src: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=240&auto=format&fit=crop&q=70",
          alt: "UX wireframes and interface sketches",
        },
        {
          src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=240&auto=format&fit=crop&q=70",
          alt: "Designer arranging digital product screens",
        },
      ],
    },
    {
      text: "Lead Generation",
      images: [
        {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=240&auto=format&fit=crop&q=70",
          alt: "Team planning a lead generation funnel",
        },
        {
          src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=240&auto=format&fit=crop&q=70",
          alt: "Business team reviewing customer acquisition",
        },
      ],
    },
    {
      text: "WordPress",
      images: [
        {
          src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=240&auto=format&fit=crop&q=70",
          alt: "Laptop showing website production work",
        },
        {
          src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=240&auto=format&fit=crop&q=70",
          alt: "Website layout design on a desk",
        },
      ],
    },
    {
      text: "React & Next.js",
      images: [
        {
          src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=240&auto=format&fit=crop&q=70",
          alt: "React development screen",
        },
        {
          src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=240&auto=format&fit=crop&q=70",
          alt: "Modern JavaScript code editor",
        },
      ],
    },
    {
      text: "Business Problem Solving",
      images: [
        {
          src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=240&auto=format&fit=crop&q=70",
          alt: "Business strategy workshop",
        },
        {
          src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=240&auto=format&fit=crop&q=70",
          alt: "Consulting team solving business problems",
        },
      ],
    },
  ];

  return (
    <div className="mt-12 flex w-full flex-col rounded-sm bg-bg-secondary px-10 py-4">
      <h3 className="mono text-sm font-black uppercase text-text-secondary">
        Our services
      </h3>
      {items.map((item) => (
        <RevealImageListItem
          key={item.text}
          text={item.text}
          images={item.images}
        />
      ))}
    </div>
  );
}

export { RevealImageList };
