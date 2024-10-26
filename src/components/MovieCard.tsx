import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  image: string;
  releaseDate: string;
  availableSeats: number;
  price: number;
}

interface MovieCardProps {
  movie: Movie;
  availableSeats: number; // From parent component
  onBookNow: () => void; // Handler from parent
  onCancelBooking: () => void; // Handler from parent
}

export const MovieCard = ({ movie, availableSeats, onBookNow, onCancelBooking }: MovieCardProps) => {
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);
  const [bookingTime, setBookingTime] = useState<Date | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // For confirmation dialog

  const handleConfirmBooking = () => {
    setIsConfirmDialogOpen(false); // Close dialog
    setIsBooked(true);
    setBookingTime(new Date());
    onBookNow(); // Decrease availableSeats from parent
    toast({
      title: "Booking Confirmed!",
      description: `You have successfully booked a ticket for ${movie.title}`,
    });
  };

  const handleCancel = () => {
    setIsBooked(false);
    setBookingTime(null);
    onCancelBooking(); // Increase availableSeats from parent
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  // Allow cancel within 10 minutes
  const canCancel = bookingTime && (new Date().getTime() - bookingTime.getTime()) <= 600000; // 10 minutes

  return (
    <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-gray-800">
      <CardHeader className="p-0">
        <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2 text-white">{movie.title}</CardTitle>
        <div className="space-y-2 text-gray-300">
          <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p>Available Seats: {availableSeats}</p> {/* Updated to use dynamic seats */}
          <p>Price: ${movie.price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {!isBooked ? (
          <>
            <Button
              className="w-full"
              onClick={() => setIsConfirmDialogOpen(true)} // Open confirm dialog
              disabled={availableSeats === 0} // Disable if no seats available
            >
              {availableSeats === 0 ? "Sold Out" : "Book Now"}
            </Button>
            {/* Confirmation Dialog */}
            <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Booking</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to book a ticket for <strong>{movie.title}</strong>?
                    <br />
                    Price: ${movie.price}
                    <br />
                    Description: A fantastic movie releasing on {new Date(movie.releaseDate).toLocaleDateString()}.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsConfirmDialogOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmBooking}>
                    Confirm Booking
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={!canCancel}
              >
                {canCancel ? "Cancel Booking" : "Cannot Cancel"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel your booking for {movie.title}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancel}>
                  Yes, Cancel Booking
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};
