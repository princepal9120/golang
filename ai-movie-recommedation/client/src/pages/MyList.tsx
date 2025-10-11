import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Trash2, Heart, Tv, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_WATCHLIST = [
  { id: 1, title: "Attack on Titan", year: 2013, rating: 4.9, poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=300&h=450&fit=crop", genre: "Shounen", episodes: 87, studio: "MAPPA", status: "Completed", addedDate: "2025-01-10" },
  { id: 2, title: "Demon Slayer", year: 2019, rating: 4.8, poster: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=300&h=450&fit=crop", genre: "Shounen", episodes: 44, studio: "ufotable", status: "Ongoing", addedDate: "2025-01-09" },
  { id: 3, title: "Steins;Gate", year: 2011, rating: 4.9, poster: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=300&h=450&fit=crop", genre: "Sci-Fi", episodes: 24, studio: "White Fox", status: "Completed", addedDate: "2025-01-08" },
  { id: 5, title: "One Punch Man", year: 2015, rating: 4.7, poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=450&fit=crop", genre: "Shounen", episodes: 24, studio: "Madhouse", status: "Ongoing", addedDate: "2025-01-05" },
];

const MyList = () => {
  const [watchlist, setWatchlist] = useState(MOCK_WATCHLIST);

  const removeFromList = (animeId: number) => {
    setWatchlist(watchlist.filter((anime) => anime.id !== animeId));
  };

  return (
    <div className="min-h-screen sakura-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-neon rounded-xl flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform">
                  <Tv size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient-neon">AniVerse</span>
              </Link>
              <div className="hidden md:flex gap-6 text-sm">
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/movies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Browse
                </Link>
                <Link to="/my-list" className="text-foreground font-semibold border-b-2 border-primary pb-1">
                  My List
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-glow-primary cursor-pointer hover:scale-110 transition-transform">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow-primary animate-pulse-glow">
            <Heart size={40} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-2">
              <span className="text-gradient-neon">My List</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {watchlist.length} {watchlist.length === 1 ? "anime" : "anime"} saved for later
            </p>
          </div>
        </div>

        {/* Watchlist */}
        {watchlist.length > 0 ? (
          <div className="space-y-6">
            {watchlist.map((anime, index) => (
              <div
                key={anime.id}
                className="group bg-card border-2 border-border hover:border-primary/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow-primary animate-fade-in anime-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Poster */}
                  <div className="relative md:w-48 aspect-[2/3] md:aspect-auto bg-background-secondary flex-shrink-0">
                    <img
                      src={anime.poster}
                      alt={anime.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Status Badge */}
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold ${
                      anime.status === 'Ongoing' 
                        ? 'bg-success/80 text-success-foreground border border-success' 
                        : 'bg-muted/80 text-foreground border border-muted'
                    }`}>
                      {anime.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h2 className="text-3xl font-bold mb-2 group-hover:text-gradient-neon transition-all">
                            {anime.title}
                          </h2>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3 flex-wrap">
                            <span className="flex items-center gap-1">
                              <TrendingUp size={16} className="text-primary" />
                              {anime.year}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock size={16} className="text-accent" />
                              {anime.episodes} Episodes
                            </span>
                            <span>•</span>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-bold border border-primary/30">
                              {anime.genre}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Studio: <span className="text-foreground font-medium">{anime.studio}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-gradient-primary px-4 py-2 rounded-xl shadow-glow-primary">
                          <span className="text-primary-foreground text-xl font-bold">{anime.rating}</span>
                          <span className="text-primary-foreground text-lg">★</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                        <Heart size={14} className="text-secondary" />
                        Added on {new Date(anime.addedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="hero" leftIcon={<Play size={18} />} className="shadow-glow-primary">
                        Watch Now
                      </Button>
                      <Button
                        variant="ghost"
                        leftIcon={<Trash2 size={18} />}
                        onClick={() => removeFromList(anime.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-2xl border-2 border-primary/20">
            <div className="w-32 h-32 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/30">
              <Heart size={60} className="text-primary" />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-gradient-neon">Your list is empty</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
              Start adding anime you want to watch later and build your personal collection
            </p>
            <Link to="/movies">
              <Button variant="hero" size="lg" className="shadow-glow-primary">
                Browse Anime
              </Button>
            </Link>
          </div>
        )}

        {/* Quick Stats */}
        {watchlist.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 hover:shadow-glow-primary transition-all anime-border">
              <h3 className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                <Tv size={16} className="text-primary" />
                Total Anime
              </h3>
              <p className="text-5xl font-bold text-gradient-neon">{watchlist.length}</p>
            </div>
            <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 hover:shadow-glow-accent transition-all anime-border">
              <h3 className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                Total Episodes
              </h3>
              <p className="text-5xl font-bold text-accent">
                {watchlist.reduce((acc, anime) => acc + anime.episodes, 0)}
              </p>
            </div>
            <div className="bg-card border-2 border-secondary/30 rounded-2xl p-6 hover:shadow-glow-secondary transition-all anime-border">
              <h3 className="text-muted-foreground text-sm font-medium mb-2 flex items-center gap-2">
                <TrendingUp size={16} className="text-secondary" />
                Average Rating
              </h3>
              <p className="text-5xl font-bold text-secondary">
                {(watchlist.reduce((acc, anime) => acc + anime.rating, 0) / watchlist.length).toFixed(1)} ★
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
