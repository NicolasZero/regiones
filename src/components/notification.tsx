import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { useEffect } from "react";

interface NotificationProps {
  message: string;
  variant?: "default" | "success" | "destructive" | null;
}

  const Notification: React.FC<NotificationProps> = ({ message, variant="success" }) => {
    const { toast } = useToast();
  
    useEffect(() => {
      const notification = (message: string) => {
        toast({
          title: "Notificación",
          description: message,
          variant: variant,
          action: <ToastAction altText="Cerrar">Cerrar</ToastAction>,
        });
      };
  
      notification(message);
    }, [message]);
  
    return null;
  };
  
  export { Notification };
