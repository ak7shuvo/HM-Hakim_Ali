"use client";

// Quiet hairline text link for long archive pages. Target is <body id="top">.
// The plain anchor still works without JS; with JS it scrolls smoothly (instantly under
// prefers-reduced-motion) and moves keyboard focus to the top so it doesn't stay at the bottom.
export default function BackToTop() {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById("top") || document.body;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

    const hadTabIndex = target.hasAttribute("tabindex");
    if (!hadTabIndex) target.setAttribute("tabindex", "-1");
    const previousOutline = target.style.outline;
    target.style.outline = "none";
    target.focus({ preventScroll: true });
    const restore = () => {
      if (!hadTabIndex) target.removeAttribute("tabindex");
      target.style.outline = previousOutline;
      target.removeEventListener("blur", restore);
    };
    target.addEventListener("blur", restore);
  };

  return <p className="back-top"><a className="link-arrow" href="#top" onClick={onClick}>Back to top</a></p>;
}
