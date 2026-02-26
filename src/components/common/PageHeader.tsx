import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  action,
}) => {
  return (
    <div className="mb-6">
      {/* Title with Action Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
          {title}
        </h1>
        {action && <div>{action}</div>}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {subtitle}
        </p>
      )}

      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav>
          <ol className="flex items-center gap-1.5">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  {item.href ? (
                    <Link
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                      href={item.href}
                    >
                      {item.label}
                      {index < breadcrumbs.length - 1 && (
                        <svg
                          className="stroke-current"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                            stroke=""
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-800 dark:text-white/90">
                      {item.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
};

export default PageHeader;

