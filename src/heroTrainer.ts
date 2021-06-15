import { HeroCard } from "./heroCard";

export interface HeroTrainer {
    id: string,
    name: string,
    heroCards: HeroCard[]
}