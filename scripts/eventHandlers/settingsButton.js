/**
 * Adds the required event listener on click to the settings button on a page.
 */

export function addSettingsEventListener() {
    const settings = document.getElementById("settings-button");
    if (!settings) throw new Error("a settings button must exist to add an event listener");

    settings.addEventListener("click", () => {
        settings.disabled = true;
    });
}