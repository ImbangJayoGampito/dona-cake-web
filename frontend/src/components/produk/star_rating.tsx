import { Star } from "lucide-react" // or any other icon library

interface StarRatingProps {
  rating: number 
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 !== 0

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "fill-primary text-primary"
              : i === fullStars && hasHalf
                ? "fill-primary/50 text-primary"
                : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}
