import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useNavigationHistory } from '../../lib/utils/navigation';
import { cn } from '../../lib/utils';

interface BreadcrumbNavProps {
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ className }) => {
  const history = useNavigationHistory();
  if (history.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-2 text-sm text-muted-foreground",
        className
      )}
    >
      <Link
        to="/"
        className="hover:text-foreground transition-colors"
      >
        Home
      </Link>
      
      {history.slice(0, -1).reverse().map((entry, index) => (
        <React.Fragment key={entry.path}>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={entry.path}
            className="hover:text-foreground transition-colors max-w-[200px] truncate"
            title={entry.title}
          >
            {entry.title}
          </Link>
        </React.Fragment>
      ))}
      
      {history.length > 0 && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium max-w-[200px] truncate">
            {history[0].title}
          </span>
        </>
      )}
    </nav>
  );
}