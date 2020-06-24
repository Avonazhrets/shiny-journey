#include<fstream>
#include <iomanip>

using namespace std;

ofstream fout("RiemanTable.js");

const int N = 1001;

int gcd(int a,int b) {
    return !b ? a : gcd(b, a % b);
}


int main() {
    fout << "var RiemanTableX = [";
    for(int i = 0; i <= N; ++i) {
        fout << "[0";
        for (int j = 1; j <= N; ++j) {
            if (i == 0 || j == 0) {
                fout << ", 0";
            } else if (gcd(i,j) == 1) {
                long double x = (long double)(j)/(long double)(i);
                if (x < 0.5) {
                    x = (-1.0 * (0.5 - x) * 0.001 + x * 0.499) / 0.499;
                } else {
                    x = ((x - 0.5) * 0.001 + x * 0.499) /0.499;
                }
                fout << ", " << setprecision(20) << fixed << x;
            }
        }
        if (i < N)
            fout << "], ";
        else
            fout << "]";
    }
    fout << " ];\n";

    fout << "var RiemanTableY = [";
    for(int i = 0; i <= N; ++i) {
        fout << "[0";
        for (int j = 1; j <= N; ++j) {
            if (i == 0 || j == 0) {
                fout << ", 0";
            } else if (gcd(i,j) == 1) {
                long double y = 1.0/(long double)(i);
                if (y < 0.015) {
                    long double extra = (1 - y/0.015) * 0.001;
                    y -= extra;
                }
                fout << ", " << setprecision(20) << fixed << y;
            }
        }
        if (i < N)
            fout << "], ";
        else
            fout << "]";
    }
    fout << " ];";
    return 0;
}