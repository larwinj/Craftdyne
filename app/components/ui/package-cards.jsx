import { Package, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PRODUCT_PACKAGES = {
  ez3plus: [
    { size: '1 Liter', label: 'Commercial Farm Pack', popular: false, icon: 'bottle' },
    { size: '500 mL', label: 'Standard Spray Pack', popular: false, icon: 'bottle' },
    { size: '100 mL', label: 'Trial & Small Farm Pack', popular: false, icon: 'bottle' },
  ],
  blumennStrong: [
    { size: '100 mL', label: 'Super Concentrate Pack', popular: false, icon: 'bottle' },
  ],
  mycoSpectra: [
    { size: '1 Liter', label: 'Fungicide Protection Pack', popular: false, icon: 'bottle' },
  ],
  mycoDelta: [
    { size: '50 mL', label: 'Liquid Concentrate Package', popular: false, icon: 'bottle' },
    { size: 'Granules', label: 'Soil Granules Package', popular: false, icon: 'box' },
  ],
  mycoSiga: [
    { size: '50 mL', label: 'Liquid Concentrate Package', popular: false, icon: 'bottle' },
  ],
  soilAmend: [
    { size: '5 kg Block', label: 'Compressed Organic Block (Expands 75L)', popular: false, icon: 'box' },
    { size: 'Granules', label: 'Soil Conditioning Granules Package', popular: false, icon: 'box' },
  ],
};

export function PackageCards({ productId, className = '' }) {
  const { t } = useTranslation();
  const packages = PRODUCT_PACKAGES[productId] || [];

  if (packages.length === 0) return null;

  return (
    <div className={`mt-8 space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <Package className="size-5 text-brand-600" aria-hidden="true" />
        <h3 className="font-display text-base font-bold text-navy-900 sm:text-lg">
          {t('products.packagesTitle', 'Available Package Sizes & Quantities')}
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Package className="size-4 text-brand-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{pkg.label}</span>
              </div>
              <p className="font-display mt-2 text-xl font-extrabold text-navy-900">{pkg.size}</p>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="size-3.5" />
              <span>Sealed EcoAgta Pack</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
