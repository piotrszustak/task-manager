// === Function definitions ===

export function showErrorMessage(container, message) {
    let errorMessage = container.querySelector('#errorMessage');

    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.id = 'errorMessage';
        container.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
}

export function cleanErrorMessage(container) {
    let errorMessage = container.querySelector('#errorMessage');

    if (errorMessage) errorMessage.remove();
}