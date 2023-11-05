export type extendedDocument : Document {
    startViewTransition(callback: () => void): void;
    endViewTransition(): void;
}