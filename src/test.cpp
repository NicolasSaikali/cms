#include<iostream>
#include<vector>
#include<queue>
#include<stack>
#include<cmath>
using namespace std;

class Digraph{
private:
	int w, n;
	vector<vector<int>> adjMatrix;
	vector<int> weights;
	stack<int> topSortStack;
	vector<bool>vertexVisited;
	vector<int> pi;
public:	
	Digraph(int weight, vector<int>& weights){
		n = weight + 1;
		w = weight;
		vertexVisited = vector<bool>(n,false);
		adjMatrix = vector<vector<int>>(n, vector<int>(n,0));
		Initialize(weight, weights);
		pi = vector<int>(n,-1);
		
	}
	void addEdge(int u, int v, int edge){
		adjMatrix[u][v] = edge;
	}
    void Initialize(int weight ,vector<int>& weights){
	if(w<0) return;
	for(int i=0;i<weights.size();i++){
			if(weights[i] <= weight){
				//addEdge(weight-1, weight-weights[i],1);
				adjMatrix[weight][weight - weights[i]] = 1;
				Initialize(weight-weights[i], weights);
			}
		}
	}
	void display(){
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++){
				cout<<adjMatrix[i][j]<<" ";
			}
			cout<<endl;
		}
	
	}
	void displayTopSort(){
		cout<<"Top sort display: \n";
		stack<int> clone = topSortStack;
		while(!clone.empty()){
			cout<<clone.top()<<" ";
			clone.pop();
		}
	}
	bool allVisited(){
		for(int i=0;i<n;i++)
			if(!vertexVisited[i])
				return false;
		return true;
	}
	void dfsVisit(int u){
		vertexVisited[u] = true;
		for(int i=0;i<n;i++){
			if(adjMatrix[u][i] != 0 && i!=u && !vertexVisited[i])
				dfsVisit(i);
		}
		topSortStack.push(u);
	}

	void displayLongestPath(int i){
		stack<int> path;
		do{
			if(pi[i] != -1)
			path.push(pi[i] - i);
			i = pi[i];
		}while(i != n-1);
		cout<<"maximum cuts with minimal waste : "<<endl;
		while(!path.empty()){
		cout<<path.top()<<" ";
		path.pop();
		}
	}
	void longestPath(){
		vector<int> values(n,-999);
		dfsVisit(n-1);
		values[n-1] = 0;
		while(!topSortStack.empty()){
			for(int v=0;v<90;v++){
				int tmp = topSortStack.top();
				if(v!=tmp && adjMatrix[tmp][v] != 0){
					if(values[v] < values[tmp] + 1)
					{
						values[v] = values[tmp] + 1;
						pi[v] = tmp;
					}
				}
			}
			topSortStack.pop();
		}
	}
	int minimumWasteValue(){
		for(int i=0;i<pi.size();i++)
			if(pi[i] != -1) 
				return i;
		
	}



};

/*
void graph(int w, vector<vector<int>> &a, vector<int> &weights){
	if(w<=0) return;
	for(int i=0;i<weights.size();i++){
		if(weights[i] <= w){
			cout<<"adding "<<w<<" "<<w - weights[i]<<endl;
			a[w-1][w - weights[i]] = 1;
			graph(w-weights[i], a, weights);
		}
	
}
*/

int main(){
	int arr[5] = {45,28,20,38};
	int w = 89;
	vector<int> weights(arr,arr+4);
	cout<<"W = "<<w<<endl;
	cout<<"Sizes :  45, 28, 20, 38\n";
	Digraph g(w,weights);
	//g.display();
	g.longestPath();
	g.displayLongestPath(g.minimumWasteValue());
	system("pause");
	return 0;
}