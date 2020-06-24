#include <fstream>
#include <unordered_set>
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <set>

using namespace std;

ofstream fout("generated_dots.js");

unordered_set<long double> dots;
const int max_power = 13;
int cnt = 0;
vector<pair<long double, long double> > ans;

set<long double> dont_use;
const long double eps2 = 1e-3;

void rec(int power, long double value, long double temp, int ones) {
    if (ones > 4) {
        return;
    }
//    cout << value << "\n";
    if (dots.find(value) == dots.end()) {
        bool stop = 0;
        if (ones > 0) {
            for (auto i : dont_use) {
                if (abs(i - value) < eps2) {
                    stop = true;
                    break;
                } else if (i > value) {
                    break;
                }
            }
        }
        if (!stop) {
            ans.push_back(make_pair(-(1.0 / (ones + 1)), value));
            cnt++;
            dots.insert(value);

            if (ones == 0) {
                dont_use.insert(value);
            }
        }
    }
    if (power == max_power) {
        return;
    }
    rec(power + 1, value, temp / 3.0, ones);
    rec(power + 1, value + temp, temp / 3.0, ones + 1);
    rec(power + 1, value + 2 * temp, temp / 3.0, ones);
    return;
}

const long double eps = 4.0 * 1e-5;

int main() {
    fout << "var Dots = [";
    rec(1, 0, 1.0 / 3.0, 0);
    sort(ans.begin(), ans.end());
    int last = 0, total = 0;
    for (int i = 0; i < cnt; ++i) {
        if (i && abs(ans[i].second - ans[last].second) > eps) {
            last = i;
            fout << "[" << ans[i].second << ", " << -ans[i].first << "], ";
            total++;
        }
    }
    fout << "];\n";
    fout << "var Sz = " << total << ";\n";
//    cout << cnt;
    return 0;
}