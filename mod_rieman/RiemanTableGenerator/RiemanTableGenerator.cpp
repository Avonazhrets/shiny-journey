#include<fstream>

using namespace std;

ofstream fout("RiemanTable.js");

const int N = 1001;

int gcd(int a,int b) {
    return !b ? a : gcd(b, a % b);
}


int main() {
    fout << "var RiemanTable = [";
    for(int i = 0; i <= N; ++i) {
        fout << "[0";
        for (int j = 1; j <= N; ++j) {
            if (i == 0 || j == 0) {
                fout << ", 0";
            } else {
                fout << ", " << gcd(i, j);
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