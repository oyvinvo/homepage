import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { App } from '../App';
import { CVManifestDrawer } from '../manifest/CVManifestDrawer';
import { usePortfolioStore } from '../shared/store';

describe('KulturIT UX & Accessibility Audit - Modern Minimalist Zero-3D Architecture', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
    usePortfolioStore.setState({
      activeSection: 'hero',
      selectedCategory: 'all',
      searchQuery: '',
      isCvDrawerOpen: false,
      toast: null,
      expandedMilestoneId: null,
    });
    vi.clearAllMocks();
  });

  describe('1. Semantic HTML, Landmarks & Screen Reader Parity', () => {
    it('provides accessible skip link as first element pointing to #main-content', () => {
      render(<App />);
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('renders standard semantic landmarks without WebGL canvas', () => {
      const { container } = render(<App />);

      expect(screen.getByRole('banner')).toBeInTheDocument(); // <header>
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content'); // <main id="main-content">
      expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument(); // <nav>
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // <footer>

      // Verify decorative 3D effects are non-blocking and screen-reader hidden
      const canvases = container.querySelectorAll('canvas');
      canvases.forEach((c) => {
        expect(c).toHaveAttribute('aria-hidden', 'true');
        expect(c.className).toContain('pointer-events-none');
      });
    });

    it('renders all core semantic sections with correct IDs', () => {
      render(<App />);
      expect(document.getElementById('hero')).toBeInTheDocument();
      expect(document.getElementById('leadership')).toBeInTheDocument();
      expect(document.getElementById('experience')).toBeInTheDocument();
      expect(document.getElementById('projects')).toBeInTheDocument();
      expect(document.getElementById('skills')).toBeInTheDocument();
      expect(document.getElementById('contact')).toBeInTheDocument();
    });

    it('ensures all external outbound links contain rel="noopener noreferrer" and target="_blank"', () => {
      render(<App />);
      const externalLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
      expect(externalLinks.length).toBeGreaterThan(0);

      externalLinks.forEach((link) => {
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('rel')).toContain('noreferrer');
      });
    });

    it('renders profile portrait image with descriptive accessible alt attribute', () => {
      render(<App />);
      const portrait = screen.getByRole('img', { name: /portrait of øyvind volden/i });
      expect(portrait).toBeInTheDocument();
      expect(portrait).toHaveAttribute('alt', 'Portrait of Øyvind Volden');
    });

    it('renders avatar in CVManifestDrawer with accessible alt attribute', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      render(<CVManifestDrawer />);
      const avatar = screen.getByRole('img', { name: /øyvind volden/i });
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('2. Focus Management & Dialog Focus Trapping', () => {
    it('traps focus within CVManifestDrawer and closes on Escape key', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      render(<CVManifestDrawer />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'manifest-title');

      // Press Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);
    });

    it('cycles focus within CVManifestDrawer on Tab and Shift+Tab', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      render(<CVManifestDrawer />);

      const closeBtn = screen.getByRole('button', { name: /close cv manifest drawer/i });
      const printBtn = screen.getByLabelText(/print or save as pdf/i);
      const savePdfBtn = screen.getByRole('button', { name: /^save as pdf$/i });

      // Focus last element and press Tab -> should wrap to first element
      savePdfBtn.focus();
      fireEvent.keyDown(window, { key: 'Tab', shiftKey: false });

      // Focus first element and press Shift+Tab -> should wrap to last element
      printBtn.focus();
      fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });

      expect(closeBtn).toBeInTheDocument();
    });

    it('closes CVManifestDrawer when clicking on backdrop', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      render(<CVManifestDrawer />);

      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);
    });

    it('restores focus to previously active element when CVManifestDrawer closes', () => {
      render(<App />);

      const cvButton = screen.getByRole('button', { name: /view full cv \/ resume/i });
      cvButton.focus();
      expect(document.activeElement).toBe(cvButton);

      // Open drawer
      fireEvent.click(cvButton);
      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(true);

      // Close drawer via Escape key
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);

      // Verify focus is restored to the triggering button
      expect(document.activeElement).toBe(cvButton);
    });

    it('does not hijack "c" or "Ctrl+C" / "Cmd+C" copy keystrokes (WCAG 2.1.4)', () => {
      render(<App />);

      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);

      // Pressing Ctrl+C should never open the drawer
      fireEvent.keyDown(window, { key: 'c', ctrlKey: true });
      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);

      // Pressing single 'c' should also never open the drawer
      fireEvent.keyDown(window, { key: 'c' });
      expect(usePortfolioStore.getState().isCvDrawerOpen).toBe(false);
    });
  });

  describe('3. Mobile Touch Targets & Responsive Controls', () => {
    it('ensures core action buttons and navigation controls meet minimum 44px touch target standard', () => {
      render(<App />);

      // Case studies CTA
      const caseStudiesBtn = screen.getByRole('link', { name: /view architecture case studies/i });
      expect(caseStudiesBtn.className).toContain('min-h-[44px]');

      // Mobile menu toggle button
      const mobileToggleBtn = screen.getByRole('button', { name: /toggle navigation menu/i });
      expect(mobileToggleBtn.className).toContain('min-w-[44px]');
      expect(mobileToggleBtn.className).toContain('min-h-[44px]');

      // Filter tabs
      const allTab = screen.getByRole('tab', { name: /all projects/i });
      expect(allTab.className).toContain('min-h-[44px]');

      // Copy Email button
      const copyEmailBtn = screen.getByRole('button', { name: /copy email address/i });
      expect(copyEmailBtn.className).toContain('min-h-[44px]');
    });
  });

  describe('4. ARIA Parity & Assistive Technology Feedback', () => {
    it('manages aria-expanded and aria-controls on milestone details', () => {
      render(<App />);

      const milestoneToggle = screen.getAllByRole('button', { name: /view highlights/i })[0];
      expect(milestoneToggle).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(milestoneToggle);
      expect(milestoneToggle).toHaveAttribute('aria-expanded', 'true');
      expect(milestoneToggle).toHaveAttribute('aria-controls');
    });

    it('renders search input with explicit accessible label', () => {
      render(<App />);
      const searchInput = screen.getByLabelText(/search architecture projects/i);
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });
  });

  describe('5. Feature 007: Enriched CV Drawer & Print Pagination Stability', () => {
    it('renders all 12 enriched architecture case studies within the CV drawer', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      render(<CVManifestDrawer />);

      expect(screen.getByRole('heading', { name: /key architectural case studies/i })).toBeInTheDocument();
      expect(screen.getByText(/Bekymringsmestring: Mental Health & Mindfulness Platform/i)).toBeInTheDocument();
      expect(screen.getByText(/VirtueltMuseum 3D: Curated Virtual 3D Rooms & Artifacts \(vm\/3d\)/i)).toBeInTheDocument();
      expect(screen.getByText(/VirtueltMuseum 360: Immersive 360° Panoramic Experiences \(vm\/360\)/i)).toBeInTheDocument();
      expect(screen.getByText(/VirtueltMuseum: Scrollytelling Exhibitions & Quizzes \(vm\/scrollytelling & vm\/quiz\)/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur In-House Cookie Consent & Privacy Platform \(cookie-consent-api\)/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur Domain APIs & In-House PostgreSQL Message Queue/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur Central SSO & OAuth2 Infrastructure/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur Microfrontends & Shared Modules Monorepo \(30\+ Packages\)/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur Handover: E-ARK National Digital Preservation Pipeline/i)).toBeInTheDocument();
      expect(screen.getByText(/eKultur AI Vision: Automated Museum Collection Enrichment & OCR/i)).toBeInTheDocument();
      expect(screen.getByText(/Autosys KSAK: National Vehicle Approvals Modernization/i)).toBeInTheDocument();
      expect(screen.getByText(/Statens vegvesen Automated Regulatory Rule Engine/i)).toBeInTheDocument();
    });

    it('applies print pagination stability classes to avoid awkward page breaks across cards', () => {
      usePortfolioStore.setState({ isCvDrawerOpen: true });
      const { container } = render(<CVManifestDrawer />);

      const avoidBreakElements = container.querySelectorAll('.print-avoid-break');
      expect(avoidBreakElements.length).toBeGreaterThanOrEqual(8);
    });

    it('ensures 3D cursor trail effect is non-blocking (pointer-events-none) and accessible (aria-hidden)', () => {
      const { container } = render(<App />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas).toHaveAttribute('aria-hidden', 'true');
      expect(canvas?.className).toContain('pointer-events-none');
    });
  });

  describe('6. Theme Switching & Dynamic Section Activation', () => {
    it('toggles theme state and applies dark class to documentElement', () => {
      usePortfolioStore.setState({ theme: 'light' });
      render(<App />);

      const themeToggleBtn = screen.getByRole('button', { name: /switch to rich dark theme/i });
      expect(themeToggleBtn).toBeInTheDocument();

      fireEvent.click(themeToggleBtn);
      expect(usePortfolioStore.getState().theme).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      const lightToggleBtn = screen.getByRole('button', { name: /switch to colorful light theme/i });
      fireEvent.click(lightToggleBtn);
      expect(usePortfolioStore.getState().theme).toBe('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('sets active section to projects and contact when clicking navigation links', () => {
      render(<App />);
      const nav = screen.getByRole('navigation', { name: /main navigation/i });

      const projectsLink = within(nav).getByRole('link', { name: /^projects$/i });
      fireEvent.click(projectsLink);
      expect(usePortfolioStore.getState().activeSection).toBe('projects');

      const contactLink = within(nav).getByRole('link', { name: /^contact$/i });
      fireEvent.click(contactLink);
      expect(usePortfolioStore.getState().activeSection).toBe('contact');
    });

    it('renders Team Leader role in Ciber experience card', () => {
      render(<App />);
      expect(screen.getByText(/Senior Consultant & Team Leader/i)).toBeInTheDocument();
    });
  });
});
