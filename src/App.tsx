import { useState } from "react";
import "./App.css";
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
} from "@mui/material";

function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [shuffledCards, setShuffledCards] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [fortune, setFortune] = useState<string>("");

  const cards = ["❤️", "♠️", "♦️", "♣️", "🃏", "🎴"];
  const fortunes = [
    "คุณจะโชคดีในเร็วๆ นี้ 🎉",
    "ระวังเรื่องการเงิน 💸",
    "จะมีคนคิดถึงคุณ 🥰",
    "โอกาสดีจะเข้ามา ✨",
    "อย่าเพิ่งตัดสินใจเร็วเกินไป 🤔",
    "วันนี้คุณคือผู้ชนะ! 🏆",
  ];

  // ฟังก์ชันสลับลำดับไพ่
  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setSelectedCard(null);
  };

  // เมื่อคลิกไพ่
  const handleCardClick = (card: string) => {
    setSelectedCard(card);
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(randomFortune);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Pick a Card 🎴
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={shuffleCards}
        sx={{ mr: 2 }}
      >
        🔄 Shuffle Cards
      </Button>

      {selectedCard && (
        <Box mt={4}>
          <Typography variant="h5">You picked:</Typography>
          <Typography variant="h2">{selectedCard}</Typography>
        </Box>
      )}

      <Grid container spacing={2} justifyContent="center" mt={4}>
        {(shuffledCards.length > 0 ? shuffledCards : cards).map(
          (card, index) => (
            <Grid item key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(card)}>
                  <CardContent>
                    <Typography variant="h3" align="center">
                      {card}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {/* Modal ทำนายโชค */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>🔮 คำทำนายของคุณ</DialogTitle>
        <DialogContent>
          <Typography variant="h2" align="center">
            {selectedCard}
          </Typography>
          <Typography variant="body1" mt={2}>
            {fortune}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
