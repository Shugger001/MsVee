import { ContentPage } from "@/components/ContentPage";

export const metadata = { title: "FDA Regulations" };

export default function FdaPage() {
  return (
    <ContentPage title="FDA Regulations">
      <p>
        Our products are handcrafted cosmetics and soaps. Statements on this site have not been
        evaluated by the Food and Drug Administration. Our products are not intended to diagnose,
        treat, cure, or prevent any disease.
      </p>
      <p>
        If you have sensitive skin or medical conditions, consult your healthcare provider before
        use. Discontinue use if irritation occurs.
      </p>
    </ContentPage>
  );
}
