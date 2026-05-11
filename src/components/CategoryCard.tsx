import { Link } from "react-router-dom";
import {
  Thermometer, Leaf, Waves, Wind, Droplets,
  Sun, Sprout, Building2,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { Category } from "../types/public";

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Thermometer,
  Leaf,
  Waves,
  Wind,
  Droplets,
  Sun,
  Sprout,
  Building2,
};

interface Props {
  category: Category;
}

export default function CategoryCard({ category }: Props) {
  const Icon = iconMap[category.icon] ?? Leaf;
  return (
    <Link
      to={`/search?category=${category.id}`}
      className={`group flex flex-col gap-3 p-5 rounded-xl border border-gray-200 dark:border-gray-800 ${category.bgColor} hover:shadow-md transition-all hover:scale-[1.02]`}
    >
      <div className={`w-10 h-10 rounded-lg bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${category.color}`} />
      </div>
      <div>
        <h3 className={`text-sm font-semibold ${category.color} group-hover:underline`}>{category.name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{category.description}</p>
      </div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{category.articleCount} articles</p>
    </Link>
  );
}
