
// forces a document element to reflow
// used for updates between adding and
// removing a class within the same
// frame
export function forceReflow(element) {
    void element.offsetWidth;
}