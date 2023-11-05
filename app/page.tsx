import { getCompanies } from "@/lib/db";
import { redirect } from "next/navigation";


export default async function HomePage() {
  const companies = await getCompanies();
  redirect("/" + companies[0].name.split(" ").join("-"));

  return <div>
    Ooooh Scarry!
  </div>
}
