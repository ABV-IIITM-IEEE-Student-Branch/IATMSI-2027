import { Link } from 'react-router-dom';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    to,
    className = '',
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'text-white shadow-sm hover:opacity-90',
        secondary: 'bg-white border-2 text-primary-700 border-primary-700 hover:bg-primary-50',
        outline: 'bg-transparent text-primary-700 border border-primary-300 hover:border-primary-500 hover:bg-primary-50',
        ghost: 'bg-transparent text-primary-700 hover:bg-primary-50',
    };

    const explicitStyles = variant === 'primary' ? { backgroundColor: '#5B1824', color: '#ffffff' } : {};

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    // External link
    if (href) {
        return (
            <a href={href} className={classes} style={explicitStyles} {...props}>
                {children}
            </a>
        );
    }

    // Internal link
    if (to) {
        return (
            <Link to={to} className={classes} style={explicitStyles} {...props}>
                {children}
            </Link>
        );
    }

    // Button
    return (
        <button className={classes} style={explicitStyles} {...props}>
            {children}
        </button>
    );
}
