import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { App } from '../App';
import { ClipboardActionCalculator } from '../shared/ClipboardActionCalculator';
import { ProjectFilterCalculator } from '../shared/ProjectFilterCalculator';
import { projectsCatalog } from '../projects/projectsCatalog';

describe('KulturIT Security Expert Audit - Modern Minimalist Zero-3D Architecture', () => {
  describe('1. Outbound External Link Security (Tabnabbing & Referrer Leakage)', () => {
    it('enforces rel="noopener noreferrer" on all external target="_blank" links', () => {
      const { container } = render(<App />);
      const externalLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));

      expect(externalLinks.length).toBeGreaterThan(0);
      externalLinks.forEach((link) => {
        const rel = link.getAttribute('rel');
        expect(rel, `Missing or invalid rel on link: ${link.href}`).not.toBeNull();
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      });
    });

    it('ensures all external links strictly use https: protocol', () => {
      const { container } = render(<App />);
      const externalLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));

      externalLinks.forEach((link) => {
        expect(link.href.startsWith('https://'), `Insecure external link protocol found: ${link.href}`).toBe(true);
      });
    });

    it('ensures all catalog project link definitions strictly use https: and valid schemes', () => {
      projectsCatalog.forEach((proj) => {
        if (proj.links) {
          proj.links.forEach((link) => {
            expect(link.url.startsWith('https://'), `Catalog URL for ${proj.id} is not HTTPS: ${link.url}`).toBe(true);
            expect(() => new URL(link.url)).not.toThrow();
          });
        }
      });
    });
  });

  describe('2. XSS & Code Injection Defenses', () => {
    it('safely encodes mailto parameters to prevent URI injection / parameter pollution', () => {
      const payloadSubject = 'Subject\r\nBcc: hacker@attacker.com';
      const payloadBody = '"><script>alert(1)</script>';
      const uri = ClipboardActionCalculator.buildMailtoUri(
        'oyvind.volden+homepage@gmail.com',
        payloadSubject,
        payloadBody
      );

      expect(uri).not.toContain('\r\n');
      expect(uri).not.toContain('<script>');
      expect(uri).toContain('subject=Subject%0D%0ABcc%3A%20hacker%40attacker.com');
      expect(uri).toContain('body=%22%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E');
    });

    it('prevents ReDoS or query injection crashes during project filtering', () => {
      const redosPayload = '((((((((((a+)+)+)+)+)+)+)+)+)+$';
      expect(() => {
        ProjectFilterCalculator.filter(projectsCatalog, 'all', redosPayload);
      }).not.toThrow();

      const xssPayload = '<img src=x onerror=alert(1)>';
      const results = ProjectFilterCalculator.filter(projectsCatalog, 'all', xssPayload);
      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(0);
    });
  });

  describe('3. Clipboard API Security & Graceful Degradation', () => {
    it('creates well-formed sanitized success and failure notification payloads', () => {
      const untrimmedEmail = '   OYVIND.VOLDEN+HOMEPAGE@GMAIL.COM   \n';
      const successToast = ClipboardActionCalculator.createSuccessToast(untrimmedEmail);
      expect(successToast.type).toBe('success');
      expect(successToast.message).toBe('Copied oyvind.volden+homepage@gmail.com to clipboard!');

      const failureToast = ClipboardActionCalculator.createFailureToast(untrimmedEmail);
      expect(failureToast.type).toBe('error');
      expect(failureToast.message).toBe(
        'Clipboard access denied. Please manually copy: oyvind.volden+homepage@gmail.com'
      );
    });

    it('ensures zero raw mailto links are rendered in DOM for scraper protection', () => {
      const { container } = render(<App />);
      const mailtoLinks = container.querySelectorAll('a[href^="mailto:"]');
      expect(mailtoLinks).toHaveLength(0);
    });
  });
});
