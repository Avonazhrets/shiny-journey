#include <fstream>
#include <unordered_set>
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <set>
#include <random>

using namespace std;

ofstream fout("generated_dots.js");

vector<vector<double>> diagonals;
vector<pair<double, double>> dots;
unordered_set<double> used_x, used_y;

double gen(double min, double max) {
    return (double)(rand()) / RAND_MAX * (max - min) + min;
}

pair<double, double> get_sim(double x1, double y1, double x_start, double y_start) {
    x1 -= x_start;
    y1 -= y_start;
    double x2 = y1;
    double y2 = x1;
    x2 += x_start;
    y2 += y_start;
    return make_pair(x2, y2);
}

bool check_pair(pair<double, double> pr) {
    return (used_x.find(pr.first) == used_x.end() && used_y.find(pr.second) == used_y.end());
}

void draw_level(int cnt) {
    for (int x = 0; x < cnt; ++x) {
        for (int y = 0; y < cnt; ++y) {
            double diag_x_1 = x * 1.0 / cnt;
            double diag_y_1 = y * 1.0 / cnt;
            double diag_x_2 = (x + 1) * 1.0 / cnt;
            double diag_y_2 = (y + 1) * 1.0 / cnt;
            vector<double> new_diag = {diag_x_1, diag_y_1, diag_x_2, diag_y_2};
            diagonals.push_back(new_diag);
            while (true) {
                pair<double, double> fir = {gen(diag_x_1, diag_x_2), gen(diag_y_1, diag_y_2)};
                if (!check_pair(fir)) {
                    continue;
                }

                used_x.insert(fir.first);
                used_x.insert(fir.second);
                dots.push_back(fir);
                break;
            }
        }
    }
}


int main() {
    srand(time(NULL));
    int max_level = 10;
    fout << "MaxLevel = " << max_level << ";\n";
    int cnt = 1;
    for (int level = 1; level < max_level; ++level) {
        draw_level(cnt);
        cnt *= 2;
    }
    fout << "Diags = [";
    for (auto i : diagonals) {
        fout << "[" << i[0] << ", " << i[1] << ", " << i[2] << ", " << i[3] << "], ";
    }
    fout << "];\n";
    fout << "DiagsSz = " << diagonals.size() << ";\n";
    fout << "Dots = [";
    for (auto i : dots) {
        fout << "[" << i.first << ", " << i.second << "], ";
    }
    fout << "];\n";
    fout << "DotsSz = " << dots.size() << ";\n";
    return 0;
}