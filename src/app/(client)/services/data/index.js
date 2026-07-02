// app/services/data/index.js

import { hairFallData } from "./hairFallData";
import { acneData } from "./acneData";
import { acneoily } from "./acneoily";
import { pigDarkData } from "./pigDarkData";
import { nailDisorderData } from "./nailDisorderData";
import { followUpCareData } from "./followUpCareData";
import { skinInfectionData } from "./skinInfectionData";

export const servicesData = {
  "hair-fall": hairFallData,
  "acne": acneData,
  "acne-oily": acneoily,
  "pigmentation": pigDarkData,
  "nail-disorders": nailDisorderData,
  "follow-up-care": followUpCareData,
  "skin-infection": skinInfectionData
};