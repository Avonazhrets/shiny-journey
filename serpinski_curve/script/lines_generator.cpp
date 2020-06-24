#include<fstream>

using namespace std;

ofstream fout("generated_lines_1.js");

const double dist0 = 128;
double X = 0, Y = 0, dist = 128;
int cnt = 0;

void goToXY(double x, double y) {
    X = x;
    Y = y;
}

void lineRel(double deltaX, double deltaY) {
    // plotter.addLine(X, Y, X + deltaX, Y + deltaY);
    fout << "[" << X << ", " << Y << ", " << X + deltaX << ", " << Y + deltaY << "], ";
    cnt++;
    X += deltaX;
    Y += deltaY;
}

void sierpA(int level);
void sierpB(int level);
void sierpC(int level);
void sierpD(int level);

void sierpA(int level) {
    if (level > 0) {
        sierpA(level - 1);
        lineRel(+dist, +dist);
        sierpB(level - 1);
        lineRel(+2 * dist, 0);
        sierpD(level - 1);
        lineRel(+dist, -dist);
        sierpA(level - 1);
    }
}

void sierpB(int level) {
    if (level > 0) {
        sierpB(level - 1);
        lineRel(-dist, +dist);
        sierpC(level - 1);
        lineRel(0, +2 * dist);
        sierpA(level - 1);
        lineRel(+dist, +dist);
        sierpB(level - 1);
    }
}

void sierpC(int level) {
    if (level > 0) {
        sierpC(level - 1);
        lineRel(-dist, -dist);
        sierpD(level - 1);
        lineRel(-2 * dist, 0);
        sierpB(level - 1);
        lineRel(-dist, +dist);
        sierpC(level - 1);
    }
}

void sierpD(int level) {
    if (level > 0) {
        sierpD(level - 1);
        lineRel(+dist, -dist);
        sierpA(level - 1);
        lineRel(0, -2 * dist);
        sierpC(level - 1);
        lineRel(-dist, -dist);
        sierpD(level - 1);
    }
}

int main() {
    for (int level = 1; level <= 8; ++level) {
        cnt = 0;
        fout << "var Curve" << level << " = [";
        dist = dist0;
        for (int i = level; i > 0; i--)
            dist /= 2;
        goToXY(2 * dist, dist);
        sierpA(level);
        lineRel(+dist, +dist);
        sierpB(level);
        lineRel(-dist, +dist);
        sierpC(level);
        lineRel(-dist, -dist);
        sierpD(level);
        lineRel(+dist, -dist);
        fout << "];\n";
        fout << "var Sz" << level << " = " << cnt << ";\n";
    }
    return 0;
}