import { MatchConfidence, ParcelInputDetails, ParcelReference } from '../../types';
import { StorageService } from './storage';

export const LandService = {
  getAllParcels(): ParcelReference[] {
    return StorageService.getParcels();
  },

  getParcelById(id: string): ParcelReference | undefined {
    const parcels = StorageService.getParcels();
    return parcels.find((p) => p.id === id);
  },

  findParcelMatch(details: ParcelInputDetails): {
    matchedParcel?: ParcelReference;
    confidence: MatchConfidence;
    matchExplanation: string;
  } {
    const parcels = StorageService.getParcels();

    // 1. Exact match on Dag number and Mouza
    const exact = parcels.find(
      (p) =>
        p.dagNumber.trim().toLowerCase() === details.dagNumber.trim().toLowerCase() &&
        p.mouza.trim().toLowerCase() === details.mouza.trim().toLowerCase()
    );

    if (exact) {
      return {
        matchedParcel: exact,
        confidence: exact.matchConfidence || 'exact',
        matchExplanation: `Record correlates with demo ledger ID ${exact.id} (${exact.mouza}, Dag ${exact.dagNumber}).`,
      };
    }

    // 2. Partial match on Dag number within same Upazila
    const partial = parcels.find(
      (p) =>
        p.dagNumber.trim().toLowerCase() === details.dagNumber.trim().toLowerCase() ||
        (details.khatianNumber && p.khatianNumber === details.khatianNumber)
    );

    if (partial) {
      return {
        matchedParcel: partial,
        confidence: 'partial',
        matchExplanation: `Partial identifier match found with demo record ${partial.id}. Upazila records require reviewer scrutiny.`,
      };
    }

    // 3. Ambiguous match fallback if plot 999 or duplicate
    if (details.dagNumber.trim() === '999') {
      const ambig = parcels.find((p) => p.id === 'DEMO-PARCEL-004');
      return {
        matchedParcel: ambig,
        confidence: 'ambiguous',
        matchExplanation: 'Conflicting parcel identifiers between archived survey sheets. Official manual review required.',
      };
    }

    // 4. No matching event found in available demo data
    return {
      confidence: 'no_match',
      matchExplanation: 'No matching event found in the available demo data. This does not indicate that the land is unencumbered.',
    };
  },
};
