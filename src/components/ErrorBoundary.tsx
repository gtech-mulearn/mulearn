import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (
            error.message.includes('Failed to fetch dynamically imported module') ||
            error.message.includes('Importing a module script failed')
        ) {
            // Handle the error as needed, e.g., by redirecting to an error page.
            // You can use React Router to navigate to an error route.
            this.setState({ hasError: true });
        }
    }

    render() {
        if (this.state.hasError) {
            window.location.reload();
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
