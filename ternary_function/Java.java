import java.applet.Applet;
import java.awt.Graphics;
import javax.swing.*;
import java.awt.*;
import java.awt.image.*;

public class Sierp {

    static class SimpleGraphics {
        private Graphics g;
        private int x = 0, y = 0;

        public SimpleGraphics(Graphics g) {
            this.g = g;
        }

        public void goToXY(int x, int y) {
            this.x = x;
            this.y = y;
        }

        // public void lineRel(char s, int deltaX, int deltaY) {
        //     g.drawLine(x, y, x + deltaX, y + deltaY);
        //     x += deltaX;
        //     y += deltaY;
        // }
    }

    static int dist0 = 128, dist;

    public static void main(String[] args) {
        dist0 = 100;

        JFrame frame = new JFrame();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
        frame.setSize(600, 400);

        JPanel panel = new JPanel() {
            @Override
            public void paintComponent(Graphics g) {
                super.paintComponent(g);

                SimpleGraphics sg = new SimpleGraphics(g);
                paintSierp(sg);
            }
        };

        frame.add(panel);

        frame.validate();
        frame.repaint();
    }

    // public static void paintSierp(SimpleGraphics sg) {
    //     int level = 3;
    //     dist = dist0;
    //     for (int i = level; i > 0; i--)
    //         dist /= 2;
    //     sg.goToXY(2 * dist, dist);
    //     sierpA(sg, level); // start recursion
    //     sg.lineRel('X', +dist, +dist);
    //     sierpB(sg, level); // start recursion
    //     sg.lineRel('X', -dist, +dist);
    //     sierpC(sg, level); // start recursion
    //     sg.lineRel('X', -dist, -dist);
    //     sierpD(sg, level); // start recursion
    //     sg.lineRel('X', +dist, -dist);
    // }

    // private static void sierpA(SimpleGraphics sg, int level) {
    //     if (level > 0) {
    //         sierpA(sg, level - 1);
    //         sg.lineRel('A', +dist, +dist);
    //         sierpB(sg, level - 1);
    //         sg.lineRel('A', +2 * dist, 0);
    //         sierpD(sg, level - 1);
    //         sg.lineRel('A', +dist, -dist);
    //         sierpA(sg, level - 1);
    //     }
    // }

    // private static void sierpB(SimpleGraphics sg, int level) {
    //     if (level > 0) {
    //         sierpB(sg, level - 1);
    //         sg.lineRel('B', -dist, +dist);
    //         sierpC(sg, level - 1);
    //         sg.lineRel('B', 0, +2 * dist);
    //         sierpA(sg, level - 1);
    //         sg.lineRel('B', +dist, +dist);
    //         sierpB(sg, level - 1);
    //     }
    // }

    // private static void sierpC(SimpleGraphics sg, int level) {
    //     if (level > 0) {
    //         sierpC(sg, level - 1);
    //         sg.lineRel('C', -dist, -dist);
    //         sierpD(sg, level - 1);
    //         sg.lineRel('C', -2 * dist, 0);
    //         sierpB(sg, level - 1);
    //         sg.lineRel('C', -dist, +dist);
    //         sierpC(sg, level - 1);
    //     }
    // }

    // private static void sierpD(SimpleGraphics sg, int level) {
    //     if (level > 0) {
    //         sierpD(sg, level - 1);
    //         sg.lineRel('D', +dist, -dist);
    //         sierpA(sg, level - 1);
    //         sg.lineRel('D', 0, -2 * dist);
    //         sierpC(sg, level - 1);
    //         sg.lineRel('D', -dist, -dist);
    //         sierpD(sg, level - 1);
    //     }
    // }
}