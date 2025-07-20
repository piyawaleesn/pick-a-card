import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
} from "@mui/material";
import { FaMoon, FaStar, FaSun } from "react-icons/fa";
import {
  BsSuitHeartFill,
  BsSuitDiamondFill,
  BsSuitClubFill,
  BsSuitSpadeFill,
} from "react-icons/bs";

function FortuneCard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const iconColor = isDark ? "#fff" : "#000";

  const [selectedCardKey, setSelectedCardKey] = useState<string | null>(null);
  const [shuffledCards, setShuffledCards] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fortune, setFortune] = useState<string>("");

  const cardKeys = ["heart", "spade", "diamond", "club", "moon", "star", "sun"];

  const fortunes = [
    "โชคดีใกล้เข้ามาแล้ว... แต่ดูเหมือนมันกำลังติดรถเมล์อยู่ 🚌🎉",
    "คนที่แอบชอบคุณ... ยังไม่กล้าทักมาเหมือนเดิม 😂",
    "เงินจะมาหาคุณ... ถ้าคุณหยุดช้อปออนไลน์สักวันนึง 💸🛒",
    "วันนี้คุณจะเจอความรัก... ในรูปแบบของหมูกระทะ 🐷🔥",
    "คุณจะได้พบกับความสุขง่ายๆ... อย่างการนอนต่ออีก 5 นาทีหลังตื่นนอน 😴🛏️",
    "คุณมีเสน่ห์... กับแมวข้างบ้านที่มานอนหน้าประตู 🐱❤️",
    "จะมีคนคิดถึงคุณ 🥰",
  ];

  const renderIconByKey = (key: string, size: number = 48) => {
    const props = { color: iconColor, size };
    switch (key) {
      case "heart":
        return <BsSuitHeartFill {...props} />;
      case "spade":
        return <BsSuitSpadeFill {...props} />;
      case "diamond":
        return <BsSuitDiamondFill {...props} />;
      case "club":
        return <BsSuitClubFill {...props} />;
      case "moon":
        return <FaMoon {...props} />;
      case "star":
        return <FaStar {...props} />;
      case "sun":
        return <FaSun {...props} />;
      default:
        return null;
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cardKeys].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setSelectedCardKey(null);
  };

  const handleCardClick = (key: string) => {
    setSelectedCardKey(key);
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      textAlign="center"
      mt={6}
      sx={{
        color: iconColor,
      }}
    >
      <Typography variant="h3" gutterBottom fontWeight="bold">
        🔮 Pick a Fortune Card
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={shuffleCards}
        sx={{
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          fontSize: 16,
          mb: 4,
          borderRadius: 3,
        }}
      >
        Shuffle Cards
      </Button>

      <Box mt={6}>
        <Typography variant="h5" gutterBottom>
          {selectedCardKey ? "🔍 You picked:" : "🃏 Pick your card!"}
        </Typography>
        <Box display="flex" justifyContent="center">
          <Box sx={{ fontSize: 96, minHeight: 120 }}>
            {selectedCardKey ? renderIconByKey(selectedCardKey, 96) : " "}
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {(shuffledCards.length > 0 ? shuffledCards : cardKeys).map(
          (key, index) => (
            <Grid key={index} container spacing={2} justifyContent="center">
              <Card
                sx={{
                  width: 120,
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isDark ? "#444" : "#fff",
                  color: iconColor,
                  transition: "transform 0.2s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: isDark
                      ? `0px 8px 20px rgba(255, 255, 255, 0.5)`
                      : `0px 8px 20px ${theme.palette.secondary.main}50`,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => handleCardClick(key)}
                  sx={{ height: "100%" }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {renderIconByKey(key)}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              bgcolor: isDark ? "#333" : "#fff",
              color: iconColor,
              width: 400,
              height: 500,
              borderRadius: 2,
              p: 2,
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontSize: 20, fontWeight: "bold" }}>
          🔮 คำทำนายของคุณ
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 120,
              transition: "all 0.3s ease-in-out",
            }}
          >
            {selectedCardKey ? (
              <Box sx={{ transform: "scale(1)", transition: "transform 0.3s" }}>
                {renderIconByKey(selectedCardKey, 96)}
              </Box>
            ) : (
              <Box sx={{ width: 96, height: 96 }} />
            )}
          </Box>

          <Typography
            variant="body1"
            mt={2}
            sx={{ textAlign: "center", fontSize: 18 }}
          >
            {fortune}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FortuneCard;
