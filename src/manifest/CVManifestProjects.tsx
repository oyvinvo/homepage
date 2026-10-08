import React from 'react';
import { projectsCatalog } from '../projects/projectsCatalog';
import { useTranslation } from '../i18n/useTranslation';

const CASE_STUDY_KEY_MAP: Record<string, string> = {
  'bekymringsmestring': 'bekymringsmestring',
  'vm-3d': 'vm3d',
  'vm-360': 'vm360',
  'vm-scrollytelling-quiz': 'vmScrollytellingQuiz',
  'ekultur-cookie-consent': 'ekulturCookieConsent',
  'ekultur-core-apis': 'ekulturCoreApis',
  'ekultur-mfe-monorepo': 'ekulturMfeMonorepo',
  'ekultur-sso-auth': 'ekulturSsoAuth',
  'ekultur-handover': 'ekulturHandover',
  'ekultur-ai-vision': 'ekulturAiVision',
  'autosys-ksak': 'autosysKsak',
  'regelforvaltning-engine': 'regelforvaltningEngine',
  'ciber-cloud-n5d': 'ciberCloudN5d',
  'documentum-noark5': 'documentumNoark5',
  'virtuelt-museum': 'vm3d',
  'ekultur-core-gateway': 'ekulturCoreApis',
};

export const CVManifestProjects: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider print:text-slate-800 border-b border-slate-800/80 pb-2 print:border-black">
        {t.manifest.sections.flagshipProjects}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectsCatalog.map((proj) => {
          const caseKey = CASE_STUDY_KEY_MAP[proj.id];
          const localized = caseKey ? t.projects.caseStudies[caseKey] : undefined;
          const title = localized?.title ?? proj.title;
          const client = localized?.client ?? proj.client;
          const period = localized?.period ?? proj.period;
          const summary = localized?.summary ?? proj.summary;

          return (
            <div
              key={proj.id}
              className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 print:border-none print:p-0 space-y-1.5 print:break-inside-avoid print-avoid-break"
            >
              <div className="flex items-baseline justify-between gap-1">
                <span className="font-bold text-xs text-white print:text-black">{title}</span>
                <span className="text-[11px] text-slate-400 print:text-slate-600 font-mono">{period}</span>
              </div>
              <div className="text-[11px] text-cyan-400 print:text-slate-700 font-medium">{client}</div>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">{summary}</p>
              <div className="text-[11px] text-slate-400 print:text-slate-600 pt-1">
                <span className="font-semibold text-slate-300 print:text-slate-800">{t.projects.labels.techStack}: </span>
                {proj.techStack.join(', ')}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
