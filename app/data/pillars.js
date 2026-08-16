import { Leaf, Lightbulb, Microscope, Recycle, ShieldCheck, Sprout, Tractor, FlaskConical } from 'lucide-react';

/**
 * The six "Why CraftDyne?" pillars from the brochure.
 * Structure only — the copy lives in the `home` namespace, keyed by `id`.
 */
export const PILLARS = [
  { id: 'greenChemistry', icon: Lightbulb },
  { id: 'cropProtection', icon: ShieldCheck },
  { id: 'research', icon: Microscope },
  { id: 'ecoFormulations', icon: Leaf },
  { id: 'longLasting', icon: Recycle },
  { id: 'farmerFocused', icon: Tractor },
];

/** The five "What We Offer" capability statements. */
export const OFFERINGS = [
  { id: 'greenChemistrySolutions', icon: FlaskConical },
  { id: 'ecoTechnologies', icon: Leaf },
  { id: 'cropHealth', icon: Sprout },
  { id: 'sustainableFarming', icon: Tractor },
  { id: 'responsibleProducts', icon: ShieldCheck },
];
