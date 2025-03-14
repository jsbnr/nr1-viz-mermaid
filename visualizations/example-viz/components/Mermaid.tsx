import React, { useEffect, useRef } from 'react';
import { Spinner } from 'nr1';

const getMermaidTheme = (theme: string) =>
  theme === 'light' ? 'default' : 'dark';

const themeVariables = {
  // Fonts
  fontFamily: 'var(--nr1--typography--body--1--font-family)',
  fontSize: 'var(--nr1--typography--body--1--font-size)',
  fontWeight: 'var(--nr1--typography--heading--1--font-weight)',

  // Border colors
  primaryBorderColor: 'var(--nr1--color--border--regular)',
  secondaryBorderColor: 'var(--nr1--color--border--strong)',

  // Line colors
  lineColor: 'var(--nr1--color--border--strong)',

  // State colors
  errorBkgColor:
    'var(--nr1--color--background--attention--critical--mid-contrast)',
  errorTextColor: 'var(--nr1--color--text--attention--critical)',
  successBkgColor:
    'var(--nr1--color--background--attention--success--mid-contrast)',
  successTextColor: 'var(--nr1--color--text--attention--success)',
  warningBkgColor:
    'var(--nr1--color--background--attention--warning--mid-contrast)',
  warningTextColor: 'var(--nr1--color--text--attention--warning)',

  // Active/Selected states
  activeBackground: 'var(--nr1--color--background--selected--low-contrast)',
  activeBorderColor: 'var(--nr1--color--background--selected--high-contrast)',
  activeTextColor: 'var(--nr1--color--text--selected--low-contrast)',
};

const MermaidComponent = ({
  chart,
  theme,
}: {
  chart: string;
  theme: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      const { default: mermaid } = await import('mermaid');

      if (!ref.current || !chart) return;

      mermaid.initialize({
        startOnLoad: false,
        theme: getMermaidTheme(theme),
        themeVariables,
      });

      ref.current.innerHTML = chart;
      ref.current.removeAttribute('data-processed');

      try {
        await mermaid.run({
          nodes: [ref.current],
        });
      } catch (error: unknown) {
        ref.current.innerHTML =
          'Unable to render diagram. Please check your Mermaid syntax for errors.';
          console.log("error",error)
      }
    };

    renderDiagram();
  }, [chart, theme]);

  return (
    <div className="viz-mermaid-container" ref={ref}>
      <Spinner />
    </div>
  );
};

export default MermaidComponent;