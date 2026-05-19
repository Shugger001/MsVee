import { ContentPage } from "@/components/ContentPage";

export const metadata = { title: "Ingredients" };

export default function IngredientsPage() {
  return (
    <ContentPage title="Ingredients">
      <p>
        MV Luscious Lather products are made with plant-based oils and butters, essential oils,
        natural clays, and botanicals. Each product page lists full ingredients for that item.
      </p>
      <p>
        We avoid harsh preservatives, sulfates, parabens, and phthalates. Many of our soaps are
        vegan; milk-based bars are clearly labeled.
      </p>
    </ContentPage>
  );
}
