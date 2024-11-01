import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex2`.
 */
export type ContentIndex2Props =
  SliceComponentProps<Content.ContentIndex2Slice>;

/**
 * Component for "ContentIndex2" Slices.
 */
const ContentIndex2 = async ({ slice }: ContentIndex2Props): Promise<JSX.Element> => {
  const client = createClient()
  const blogPosts = await client.getAllByType("blog_post")
  const projects = await client.getAllByType("project")

  const contentType = slice.primary.content_type || "Blog"

  const items = contentType === "Blog" ? blogPosts : projects;


  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description}></PrismicRichText>
        </div>
      )}
      <ContentList 
      items= {items} 
      contentType= {contentType} 
      viewMoreText= {slice.primary.view_more_text} 
      fallbackItemImage= {slice.primary.fallback_item_image}/>
    </Bounded>
  );
};

export default ContentIndex2;
