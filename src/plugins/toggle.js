import { Logger } from "../utils/log";

const logger = new Logger("toggle");

const SELECTOR = '[data-control="toggle"]';

// Delegate click event to document
document.body.addEventListener("click", toggle);

/**
 * Toggles elements on click
 *
 * @param {MouseEvent} event
 * @author: jonalvarezz
 * @example
 * <!-- Markup -->
 * <div data-toggle="target" aria-controls="target" aria-expanded="false">Toggle</div>
 * <div id="target" class="hidden">Target</div>
 *
 */
function toggle(event) {
  const control = parentMatches(event.target, SELECTOR);

  if (!control) {
    logger.log("control does not match SELECTOR");
    return;
  }

  const id = control.getAttribute("aria-controls");
  const target = document.getElementById(id);
  const isExpanded = control.getAttribute("aria-expanded") === "true";

  if (!target) {
    logger.warn(
      `Element with id "${id}" not found in data-control toggle. Check the aria-controls attribute. Control: `,
      control
    );
    return;
  }

  if (isExpanded) {
    logger.log('switching to "collapsed"');
    control.setAttribute("aria-expanded", "false");
  }

  logger.log('switching to "expanded"');
  control.setAttribute("aria-expanded", "true");
  target.classList.toggle("hidden");

  // process extra toggle targets
  const extraTargetsSelector = control.getAttribute(
    "data-toggle-extra-targets"
  );
  if (!extraTargetsSelector) {
    logger.log("no extra targets");
    return;
  }

  const extraTargets = document.querySelectorAll(extraTargetsSelector);
  if (!extraTargets) {
    logger.warn(
      `No extra targets found for selector "${extraTargetsSelector}". Check the data-toggle-extra-targets attribute. Control: `,
      control
    );
    return;
  }

  extraTargets.forEach((extraTarget) => {
    extraTarget.classList.toggle("hidden");
  });
}

function parentMatches(element, selector) {
  if (!element || !selector) {
    return null;
  }

  if (element.matches(selector)) {
    return element;
  }

  return parentMatches(element.parentElement, selector);
}
