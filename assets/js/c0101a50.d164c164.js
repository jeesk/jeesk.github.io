"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9623],{3909:function(n){n.exports=JSON.parse('{"blogPosts":[{"id":"/\u56fe\u7b97\u6cd5\u89e3\u6790","metadata":{"permalink":"/data-structure-and-algorithm/\u56fe\u7b97\u6cd5\u89e3\u6790","source":"@site/data-structure-and-algorithm\\\\\u56fe\u7b97\u6cd5\u89e3\u6790.md","title":"\u56fe\u7b97\u6cd5\u89e3\u6790","description":"\u56fe\u7ed3\u6784\u548c2\u79cd\u641c\u7d22\u7b97\u6cd5\u5165\u95e8","date":"2022-03-09T06:59:09.765Z","formattedDate":"March 9, 2022","tags":[],"readingTime":7.46,"truncated":false,"authors":[],"frontMatter":{},"nextItem":{"title":"Sort","permalink":"/data-structure-and-algorithm/Sort"}},"content":"## \u56fe\u7ed3\u6784\u548c2\u79cd\u641c\u7d22\u7b97\u6cd5\u5165\u95e8\\r\\n\\r\\n> \u200b\\t\u5728\u6570\u636e\u7684\u903b\u8f91\u7ed3\u6784D=\uff08KR\uff09\u4e2d\uff0c\u5982\u679cK\u4e2d\u7ed3\u70b9\u5bf9\u4e8e\u5173\u7cfbR\u7684\u524d\u8d8b\u548c\u540e\u7ee7\u7684\u4e2a\u6570\u4e0d\u52a0\u9650\u5236\uff0c\u5373\u4ec5\u542b\u4e00\u79cd\u4efb\u610f\u7684\u5173\u7cfb\uff0c\u5219\u79f0\u8fd9\u79cd\u6570\u636e\u7ed3\u6784\u4e3a\u56fe\u5f62\u7ed3\u6784\\r\\n>\\r\\n> \u8fd9\u662f\u767e\u5ea6\u767e\u79d1\u7684\u89e3\u91ca\uff0c\u8bf4\u4eba\u8bdd\uff0c \u56fe\u662f\u4e00\u79cd\u6570\u636e\u7ed3\u6784\uff0c\u5176\u4e2d\u7ed3\u70b9\u53ef\u4ee5\u5177\u6709\u96f6\u4e2a\u548c\u591a\u4e2a\u76f8\u90bb\u5143\u7d20\u3002 \u4e24\u4e2a\u7ed3\u70b9\u79f0\u4e3a\u8fb9\u3002 \u7ed3\u70b9\u4e5f\u53ef\u4ee5\u53eb\u505a\u9876\u70b9\u3002 \\r\\n\\r\\n![image-20220303200106136](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220303200106136.png)\\r\\n\\r\\n###\\t1. \u56fe\u7684\u6982\u5ff5\\r\\n\\r\\n1) \u9876\u70b9(vertex)\\r\\n\\r\\n2) \u8fb9\uff08edge)\\r\\n\\r\\n3) \u8def\u5f84 \\r\\n\\r\\n   A\u8def\u5f84\u6709:  A -> B -> D,A -> B -> C -> E,   B\u6709\u8def\u5f84 B -> D\uff0cB -> C -> E\\r\\n\\r\\n4) \u6709\u5411\u56fe\u548c\u65e0\u5411\u56fe(\u6709\u5411\u56fe\u6307\u7684\u662f\u4e24\u4e2a\u5143\u7d20\u6307\u4e24\u4e2a\u5143\u7d20\u6709\u65b9\u5411\uff0c\u65e0\u5411\u56fe\u4e24\u4e2a\u5143\u7d20\u6ca1\u6709\u65b9\u5411)  \u6bd4\u5982 A->B A->D\\r\\n\\r\\n5) \u5e26\u6743\u56fe\u3002 \u6307\u7684\u662f\u8fd9\u4e2a\u8fb9\u7684\u503c\uff0c \u6bd4\u5982 A-> B \u7684\u8fb9\u8868\u793a10\u516c\u91cc\uff0c B -> C\u7684\u8fb9\u8868\u793a 5\u516c\u91cc\u3002\\r\\n\\r\\n   ![image-20220303200657735](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220303200657735.png)\\r\\n\\r\\n###\\t2. \u56fe\u7684\u8868\u793a\u65b9\u5f0f\\r\\n\\r\\n#### 2.1 \u90bb\u63a5\u77e9\u9635\\r\\n\\r\\n\u90bb\u63a5\u77e9\u9635\u662f\u8868\u793a\u56fe\u5f62\u4e2d\u9876\u70b9\u7684\u4e4b\u95f4\u7684\u5173\u7cfb\u7684\u77e9\u9635\uff0c\u5bf9\u4e8en\u4e2a \u9876\u70b9\u7684\u56fe\u800c\u8a00\uff0c \u77e9\u9635\u7684row\u548ccol \u8868\u793a\u7684\u662f 1...n\u4e2a\u70b9\u3002\u5982\u4e0b\u56fe\u6240\u793a \\r\\n\\r\\n![ ](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220303200908410.png)\\r\\n\\r\\n### 2.2 \u90bb\u63a5\u8868\\r\\n\\r\\n1. \u90bb\u63a5\u77e9\u9635\u9700\u8981\u4e3a\u7b2c\u4e2a\u9876\u70b9\u90fd\u5206\u914dn\u4e2a\u8fb9\u7684\u7a7a\u95f4\uff0c \u5176\u5b9e\u6709\u5f88\u591a\u7684\u8fb9\u4e0d\u5b58\u5728\uff0c\u9020\u6210\u7a7a\u95f4\u6d6a\u8d39\\r\\n\\r\\n2. \u90bb\u63a5\u8868\u53ea\u5173\u5fc3\u8fb9\uff0c \u4e0d\u5173\u5fc3\u4e0d\u5b58\u5728\u7684\u8fb9\u3002 \u6240\u4ee5\u6ca1\u6709\u7a7a\u95f4\u6d6a\u8d39\uff0c \u90bb\u63a5\u8868\u7531\u6570\u7ec4 + \u94fe\u8868\u7ec4\u6210 \\r\\n\\r\\n   ![image-20220303201115950](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220303201115950.png)\\r\\n\\r\\n\\r\\n\\r\\n###\\t3. \u56fe\u7d22\u7b97\u6cd5\\r\\n\\r\\n>  \u56fe\u641c\u7d22\u7b97\u6cd5\u6709\u6df1\u5ea6\u4f18\u5148(dfs)\uff0c\u548c\u5e7f\u5ea6\u4f18\u5148(bfs)\u4e24\u79cd\u3002\\r\\n>\\r\\n> ![image-20220303201411405](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220303201411405.png)\\r\\n>\\r\\n> \u5982\u679c\u4ece1 \u8fd9\u4e2a\u8282\u70b9\u4e3a\u8d77\u59cb\u70b9\u6765\u904d\u5386\uff0c \u6df1\u5ea6\u4f18\u5148\uff0c\u548c\u5e7f\u5ea6\u7684\u987a\u5e8f\u4e0d\u76f8\u540c\u3002 \\r\\n>\\r\\n>  \u6df1\u5ea6\u4f18\u5148\u641c\u7d22: 1 \uff0c2\uff0c4\uff0c8\uff0c5\uff0c3\uff0c6\uff0c7\\r\\n>\\r\\n>  \u5e7f\u5ea6\u4f18\u5148\u641c\u7d22\uff1a 1\uff0c2\uff0c3\uff0c4\uff0c5\uff0c6\uff0c7\uff0c8\\r\\n>\\r\\n>  \u7531\u4e0a\u9762\u7684\u904d\u5386\u987a\u5e8f\u6211\u4eec\u53ef\u4ee5\u53d1\u73b0\u6df1\u5ea6\u662f\u7eb5\u5411\u904d\u5386\uff0c\u800c\u5e7f\u5ea6\u662f\u6a2a\u5411\u904d\u5386\u3002\\r\\n>\\r\\n> \u4e0b\u9762\u6211\u4eec\u5c06\u7f16\u5199\u4e24\u79cd\u7b97\u6cd5\u548c\u5206\u67902\u79cd\u7b97\u6cd5\u7684\u5177\u4f53\u6267\u884c\u6d41\u7a0b\u3002\\r\\n\\r\\n####\\t3.1 \u4f7f\u7528\u4ee3\u7801\u5b9e\u73b0\u90bb\u63a5\u77e9\u9635\u548c\u90bb\u63a5\u8868\\r\\n\\r\\n#####\\t3.1.1 \u90bb\u63a5\u8868\u7684\u5b9e\u73b0\\r\\n\\r\\n\u8fd9\u91cc\u6682\u65f6\u5148\u7559\u4e0b\uff0c \u540e\u9762\u586b\u5751\\r\\n\\r\\n##### \\t3.1.2 \u90bb\u63a5\u77e9\u9635\\r\\n\\r\\n\u4e0b\u56fe\u662f\u4e00\u4e2a \u90bb\u63a5\u77e9\u9635\uff0c \u901a\u8fc7\u4e0b\u9762\u6570\u636e\u53ef\u4ee5\u770b\u5230\u6709\u4ee5\u4e0b\u5173\u7cfb\\r\\n\\r\\nA - B , B - C, C-D \u6709\u8fde\u63a5\u5173\u7cfb\uff0c \u4e0b\u9762\u7684\u56fe\u4e5f\u53ef\u4ee5\u7528\u6570\u636e\u7ed3\u67842\u7ef4\u6570\u7ec4\u6765\u8868\u793a, \u6211\u4eec\u8fd9\u91cc\u89c4\u5b9a\u4e24\u4e2a\u8282\u70b9\u76f8\u4ea4\u7684\u65f6\u5019\u503c\u4e3a1\\r\\n\\r\\n```\\r\\nint[][] = new int[4][4];\\r\\n\u90a3\u4e48A - B ,\u5728\u6570\u7ec4\u4e2d\u8868\u793a\u4e3aint[0][1] = 1,int[1][0] = 1.\\r\\n\u90a3\u4e48B - C ,\u5728\u6570\u7ec4\u4e2d\u8868\u793a\u4e3aint[0][1] = 1,int[1][0] = 1.\\r\\n\u90a3\u4e48C - D ,\u5728\u6570\u7ec4\u4e2d\u8868\u793a\u4e3aint[0][1] = 1,int[1][0] = 1.\\r\\n```\\r\\n\\r\\n![image-20220304125146917](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220304125146917.png)\\r\\n\\r\\n\u4ee3\u7801\u5982\u4e0b\\r\\n\\r\\n```java\\r\\n\\tpublic static class Graph {\\r\\n        // \u9876\u70b9\u6570\u636e(vertex)\\r\\n\\t\\tprivate List<String> vertexts;\\r\\n        // \u8fb9(\u8282\u70b9\u76f8\u4ea4\u6570\u636e)\\r\\n\\t\\tprivate int[][] edges;\\r\\n        // \u8fb9\u7684\u6570\u91cf\\r\\n\\t\\tprivate int numberOfEdges;\\r\\n\\r\\n\\t\\tpublic Graph(int count) {\\r\\n\\t\\t\\tvertexts = new ArrayList<>(count);\\r\\n\\t\\t\\tedges = new int[count][count];\\r\\n\\t\\t\\tisVeisited = new boolean[count];\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t/**\\r\\n\\t\\t * \u63d2\u5165\u9876\u70b9\u7684\u6570\u636e\\r\\n\\t\\t * @param vertex\\r\\n\\t\\t */\\r\\n\\t\\tpublic void addVertex(String vertex) {\\r\\n\\t\\t\\tvertexts.add(vertex);\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\tpublic String getVertext(int index) {\\r\\n\\t\\t\\treturn vertexts.get(index);\\r\\n\\t\\t}\\r\\n\\t\\t/**\\r\\n\\t\\t * \\r\\n\\t\\t * @param v1 \u7b2c\u4e00\u4e2a\u8282\u70b9\u7684\u7d22\u5f15\\r\\n\\t\\t * @param v2 \u7b2c\u5e72\u4e2a\u8282\u70b9\u7684\u7d22\u5f15\\r\\n\\t\\t * @param weight \u6743\u91cd\uff08\u8fd9\u91cc\u6211\u4eec\u89c4\u5b9a\u52a0\u5165\u4e24\u4e2a\u76f8\u4ea4\u6743\u91cd\u4e3a1\uff09\\r\\n\\t\\t */\\r\\n\\t\\tpublic void insertEdge(int v1, int v2, int weight) {\\r\\n\\t\\t\\tedges[v1][v2] = weight;\\r\\n\\t\\t\\tedges[v2][v1] = weight;\\r\\n\\t\\t\\tnumberOfEdges++;\\r\\n\\t\\t}\\r\\n\\t\\tpublic void insertEdge(int v1, int v2, int weight) {\\r\\n\\t\\t\\tedges[v1][v2] = weight;\\r\\n\\t\\t\\tedges[v2][v1] = weight;\\r\\n\\t\\t\\tnumberOfEdges++;\\r\\n\\t\\t}\\r\\n\\t\\tpublic void showGrpah() {\\r\\n\\t\\t\\tfor (int[] edge : edges) {\\r\\n\\t\\t\\t\\tSystem.out.println(Arrays.toString(edge));\\r\\n\\t\\t\\t}\\r\\n\\t\\t}\\r\\n\\t\\tpublic String getValueByIndex(int index) {\\r\\n\\t\\t\\treturn vertexts.get(index);\\r\\n\\t\\t}\\r\\n}\\r\\n```\\r\\n\\r\\n\u4e0b\u9762\u6765\u6d4b\u8bd5\u4e00\u4e0b\u4ee3\u7801, \u5047\u8bbe\u67094\u4e2a\u9876\u70b9\u5206\u522b\u662f \u6570\u636e\u5206\u522b\u4e3a1\uff0c2\uff0c3\uff0c4\uff0c5\uff0c6\uff0c7\uff0c8 \u4ed6\u4eec\u7684\u7d22\u5f15\u5206\u522b\u662f 0, 1,2,3 ,4\uff0c5\uff0c6\uff0c7\uff0c8 \\r\\n\\r\\n```java\\r\\npublic class GraphDemo {\\r\\n\\tpublic static void main(String[] args) throws InterruptedException {\\r\\n        // \u63d2\u51658\u4e2a\u9876\u70b9\\r\\n        String[] Vertexs = {\\"1\\", \\"2\\", \\"3\\", \\"4\\", \\"5\\", \\"6\\", \\"7\\", \\"8\\"};\\r\\n     \\tGraph graph = new Graph(Vertexs.length);\\r\\n\\t\\tfor (String s : Vertexs) {\\r\\n\\t\\t\\tgraph.addVertex(s);\\r\\n\\t\\t}\\r\\n\\r\\n       \\t// \u63d2\u51658\u6761\u8fb9\uff0c \\r\\n\\t\\tgraph.insertEdge(0, 1, 1); // \u8fd9\u91cc\u7684\u7b2c\u4e00\u4e2a\u53c2\u65700\u8868\u793a\u9876\u70b91\u7684\u7d22\u5f15\uff0c\u7b2c\u4e8c\u4e2a\u53c2\u6570\u8868\u793a\u6570\u636e\u4e3a2\u7684\u9876\u70b9\u7684\u7d22\u5f15\uff0c\u7b2c\u4e09\u4e2a\u53c2\u6570\u8868\u793a\u4e24\u4e2a\u9876\u70b9\u76f8\u4ea4\u3002\\r\\n\\t\\tgraph.insertEdge(0, 2, 1);\\r\\n\\t\\tgraph.insertEdge(1, 3, 1);\\r\\n\\t\\tgraph.insertEdge(1, 4, 1);\\r\\n\\t\\tgraph.insertEdge(3, 7, 1);\\r\\n\\t\\tgraph.insertEdge(4, 7, 1);\\r\\n\\t\\tgraph.insertEdge(2, 5, 1);\\r\\n\\t\\tgraph.insertEdge(2, 6, 1);\\r\\n\\t\\tgraph.insertEdge(5, 6, 1)\\r\\n\\t\\t// \u6253\u5370\u51fa\\r\\n\\t\\tgraph.showGrpah();\\r\\n\\t}\\r\\n}\\r\\n```\\r\\n\\r\\n\u8fd0\u884c\u4e0a\u9762\u7684main\u65b9\u6cd5\uff0c\u63a7\u5236\u53f0\u6253\u5370\u51fa\u4fe1\u606f\u5982\u4e0b\\r\\n\\r\\n```\\r\\n[0, 1, 1, 0, 0, 0, 0, 0]\\r\\n[1, 0, 0, 1, 1, 0, 0, 0]\\r\\n[1, 0, 0, 0, 0, 1, 1, 0]\\r\\n[0, 1, 0, 0, 0, 0, 0, 1]\\r\\n[0, 1, 0, 0, 0, 0, 0, 1]\\r\\n[0, 0, 1, 0, 0, 0, 1, 0]\\r\\n[0, 0, 1, 0, 0, 1, 0, 0]\\r\\n[0, 0, 0, 1, 1, 0, 0, 0]\\r\\n```\\r\\n\\r\\n\u901a\u8fc7\u4e0a\u9762\u7684\u4f8b\u5b50\u53ef\u4ee5\u5f97\u5230\u53d1\u73b0\u6570\u636e\u4e3a1 \u7684\u8fd9\u4e2a\u9876\u70b9\u7684\u8def\u5f84\u662f 1->2->4->8->5->3->6->7 \uff0c \u6216\u8005\u4e5f\u67091->2->3->4->5->6->7->8 \uff0c \u56e0\u4e3a\u9876\u70b9\u76f8\u4ea4\u662f\u591a\u5bf9\u591a\uff0c\u8def\u5f84\u8fdc\u8fdc\u4e0d\u6b62\u4e0a\u97622\u6761\u3002 \u4e8e\u662f\u5c31\u6709\u4e86\u4e0b\u9762\u76842\u79cd\u7b97\u6cd5\u6765\u6c42\u51fa\u8def\u5f84\u3002\\r\\n\\r\\n####\\t3.2 \u6df1\u5ea6\u4f18\u5148\u641c\u7d22(Depth First Search)\\r\\n\\r\\n\u5728\u8bb2\u6b65\u9aa4\u4e4b\u524d\u5148\u8bb2\u4e24\u4e2a\u6982\u5ff5\uff0c\\r\\n\\r\\n3.2.1  \u9876\u70b9\u7684\u7b2c\u4e00\u4e2a\u90bb\u63a5\u70b9 \\r\\n\\r\\n\u7b2c\u4e00\u4e2a\u662f\u6839\u636e\u7d22\u5f15\u62ff\u5230\u8be5\u7d22\u5f15\u7684\u7b2c\u4e00\u4e2a\u90bb\u63a5\u70b9(\u7d22\u5f15)\uff0c \u6bd4\u5982\u5728\u4e0a\u9762 3.1.2\u4e2d\u7684\u6570\u636e\u4e3a1\u7684\u7d22\u5f15\u7684\u4e3a0\uff0c \u90a3\u4e48\u4ed6\u7684\u7b2c\u4e00\u4e2a\u90bb\u63a5\u70b9\u5c31\u4e3a1. \\r\\n\\r\\n![image-20220304132244427](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220304132244427.png)\\r\\n\\r\\n\u4ee3\u7801\u5982\u4e0b\\r\\n\\r\\n```java\\r\\n\\t\\t/**\\r\\n\\t\\t * \u5f97\u5230\u8be5\u7d22\u5f15\u7684\u7b2c\u4e00\u4e2a\u8282\u70b9\\r\\n\\t\\t *\\r\\n\\t\\t * @param index\\r\\n\\t\\t * @return\\r\\n\\t\\t */\\r\\n\\t\\tpublic int getFirtNeighbor(int index) {\\r\\n\\t\\t\\tfor (int i = 0; i < vertexts.size(); i++) {\\r\\n\\t\\t\\t\\tif (edges[index][i] > 0) {\\r\\n\\t\\t\\t\\t\\treturn i;\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\treturn -1;\\r\\n\\t\\t}\\r\\n```\\r\\n\\r\\n3.2.2  \u6839\u636e\u524d\u4e00\u4e2a\u90bb\u63a5\u70b9\u7684\u6765\u83b7\u53d6\u4e0b\u4e00\u4e2a\u90bb\u63a5\u70b9\u7684\u7d22\u5f15\\r\\n\\r\\n\\r\\n\\r\\n![image-20220304132856641](\u56fe\u7b97\u6cd5\u89e3\u6790.assets/image-20220304132856641.png\u4ee3\u7801\u5982\u4e0b\\r\\n\\r\\n```java\\r\\n\\t\\t/**\\r\\n\\t\\t * \u6839\u636e\u524d\u4e00\u4e2a\u90bb\u8282\u70b9\u6765\u83b7\u53d6\u4e0b\u4e00\u4e2a\u90bb\u8282\u70b9\u7684\u5750\u6807\\r\\n\\t\\t * @param v1 \u7b2c\u4e00\u4e2a\u63a5\u70b9\u7684\u7d22\u5f15\\r\\n\\t\\t * @param v2 \u7b2c\u4e00\u4e2a\u63a5\u70b9\u7684\u9886\u8282\u70b9\u7d22\u5f15\\r\\n\\t\\t * @return\\r\\n\\t\\t */\\r\\n\\t\\tpublic int getNextNeighbor(int v1, int v2) {\\r\\n\\t\\t\\tfor (int i = v2 + 1; i < vertexts.size(); i++) {\\r\\n\\t\\t\\t\\tif (edges[v1][i] > 0) {\\r\\n\\t\\t\\t\\t\\treturn i;\\r\\n\\t\\t\\t\\t}\\r\\n\\t\\t\\t}\\r\\n\\t\\t\\treturn -1;\\r\\n\\t\\t}\\r\\n```\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n####         3.3 \u5e7f\u5ea6\u4f18\u5148\u641c\u7d22(Breadth First Search)"},{"id":"/Sort","metadata":{"permalink":"/data-structure-and-algorithm/Sort","source":"@site/data-structure-and-algorithm/Sort.md","title":"Sort","description":"\u5192\u6ce1\uff0c\u4ea4\u6362\uff0c\u9009\u62e9\uff0c \u63d2\u5165","date":"2022-02-12T02:46:52.916Z","formattedDate":"February 12, 2022","tags":[],"readingTime":0.105,"truncated":false,"authors":[],"frontMatter":{},"prevItem":{"title":"\u56fe\u7b97\u6cd5\u89e3\u6790","permalink":"/data-structure-and-algorithm/\u56fe\u7b97\u6cd5\u89e3\u6790"},"nextItem":{"title":"\u516b\u7687\u540e\u95ee\u9898\u89e3\u51b3\u65b9\u6848\u8be6\u89e3","permalink":"/data-structure-and-algorithm/queue-8"}},"content":"####\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n\u5192\u6ce1\uff0c\u4ea4\u6362\uff0c\u9009\u62e9\uff0c \u63d2\u5165\\r\\n\\r\\n\u57fa\u6570\u6392\u5e8f\\r\\n\\r\\nshell\\r\\n\u5feb\u901f\\r\\n\u5f52\u5e76\\r\\n\u5806\u6392\u5e8f"},{"id":"queue-8","metadata":{"permalink":"/data-structure-and-algorithm/queue-8","source":"@site/data-structure-and-algorithm/2022-02-05-queue-8.md","title":"\u516b\u7687\u540e\u95ee\u9898\u89e3\u51b3\u65b9\u6848\u8be6\u89e3","description":"\u516b\u7687\u540e\u95ee\u9898\u7684\u7a0b\u5e8f\u89e3\u7b54","date":"2022-02-05T00:00:00.000Z","formattedDate":"February 5, 2022","tags":[{"label":"algorithm","permalink":"/data-structure-and-algorithm/tags/algorithm"}],"readingTime":7.935,"truncated":false,"authors":[{"name":"jeesk","title":"java engineer","url":"https://shanjiancaofu.com","imageURL":"https://shanjiancaofu.com/img/avtor.png","key":"jeesk"}],"frontMatter":{"slug":"queue-8","title":"\u516b\u7687\u540e\u95ee\u9898\u89e3\u51b3\u65b9\u6848\u8be6\u89e3","authors":["jeesk"],"tags":["algorithm"]},"prevItem":{"title":"Sort","permalink":"/data-structure-and-algorithm/Sort"},"nextItem":{"title":"\u7ea6\u745f\u592b\u95ee\u9898\u8be6\u7ec6\u89e3\u6cd5","permalink":"/data-structure-and-algorithm/josephu-question"}},"content":"##\\t\\t\u516b\u7687\u540e\u95ee\u9898\u7684\u7a0b\u5e8f\u89e3\u7b54\\n>\u57288\xd78\u683c\u7684[\u56fd\u9645\u8c61\u68cb](https://baike.baidu.com/item/\u56fd\u9645\u8c61\u68cb/80888)\u4e0a\u6446\u653e8\u4e2a[\u7687\u540e](https://baike.baidu.com/item/\u7687\u540e/15860305)\uff0c\u4f7f\u5176\u4e0d\u80fd\u4e92\u76f8\u653b\u51fb\uff0c\u5373\u4efb\u610f\u4e24\u4e2a\u7687\u540e\u90fd\u4e0d\u80fd\u5904\u4e8e\u540c\u4e00\u884c\u3001\u540c\u4e00\u5217\u6216\u540c\u4e00\u659c\u7ebf\u4e0a\uff0c\u95ee\u6709\u591a\u5c11\u79cd\u6446\u6cd5\u3002[\u9ad8\u65af](https://baike.baidu.com/item/\u9ad8\u65af/24098)\u8ba4\u4e3a\u670976\u79cd\u65b9\u6848\u30021854\u5e74\u5728[\u67cf\u6797](https://baike.baidu.com/item/\u67cf\u6797/75855)\u7684\u8c61\u68cb\u6742\u5fd7\u4e0a\u4e0d\u540c\u7684\u4f5c\u8005\u53d1\u8868\u4e8640\u79cd\u4e0d\u540c\u7684\u89e3\uff0c\u540e\u6765\u6709\u4eba\u7528[\u56fe\u8bba](https://baike.baidu.com/item/\u56fe\u8bba/1433806)\u7684\u65b9\u6cd5\u89e3\u51fa92\u79cd\u7ed3\u679c\u3002\u5982\u679c\u7ecf\u8fc7\xb190\u5ea6\u3001\xb1180\u5ea6\u65cb\u8f6c\uff0c\u548c\u5bf9\u89d2\u7ebf\u5bf9\u79f0\u53d8\u6362\u7684\u6446\u6cd5\u770b\u6210\u4e00\u7c7b\uff0c\u5171\u670942\u7c7b\u3002[\u8ba1\u7b97\u673a](https://baike.baidu.com/item/\u8ba1\u7b97\u673a/140338)\u53d1\u660e\u540e\uff0c\u6709\u591a\u79cd\u8ba1\u7b97\u673a\u8bed\u8a00\u53ef\u4ee5\u7f16\u7a0b\u89e3\u51b3\u6b64\u95ee\u9898\u3002\\n\\n\u7531\u4e0a\u9762\u7684\u6982\u8ff0\u53ef\u4ee5\u5f97\u51fa, \u4efb\u610f\u4e24\u4e2a\u7687\u540e\u4e0d\u80fd\u5904\u4e8e\u540c\u4e00\u884c,\u540c\u4e00\u5217, \u6216\u8005\u540c\u4e00\u659c\u7ebf.  \u8fd9\u6761\u89c4\u5219\u662f\u6821\u9a8c\u516b\u7687\u540e\u662f\u5426\u5408\u6cd5\u7684\u89c4\u5219, \u540e\u9762\u7684\u4ee3\u7801\u5c06\u6839\u636e\u8fd9\u6761\u89c4\u5219\u6765\u7f16\u5199. \\n\\n\\n\\n###\\t1. \u56de\u6eaf\u6cd5\\n\\n> \u200b\\t\u9996\u5148\u6211\u4eec\u5b9a\u4e49\u4e00\u4e2a\u6570\u7ec4 array = {0 , 4, 7, 5, 2, 6, 1, 3},\u7528\u5355\u6570\u7ec4\u8868\u793a\u516b\u7687\u540e\u7684\u4f4d\u7f6e, \\n>\\n> \u4e0a\u9762\u7684\u6570\u7ec4\u4f9d\u6b21\u8868\u793a8\u7687\u540e\u5728\u68cb\u76d8\u7684\u4f4d\u7f6e, array [0] = 0, array [1]=4, array[index] = val ,\u53ef\u4ee5\u5f97\u51fa\u6bcf\u4e2a\u516b\u7687\u540e\u7684\u4f4d\u7f6e\u5728\u7b2cindex+1\u884c, \\n>\\n> \u5728(val+1) \u5217, \u5165\u4e0b\u56fe\u6240\u793a, \u53ef\u4ee5\u770b\u5230\u4e0b\u9762\u7684\u8868\u683c\u662f\u6ee1\u8db3\u4efb\u610f\u4e24\u4e2a\u7687\u540e\u4e0d\u80fd\u5904\u4e8e\u540c\u4e00\u884c,\u540c\u4e00\u5217, \u6216\u8005\u540c\u4e00\u659c\u7ebf.\\n\\n|  1   |      |      |      |      |      |      |      |\\n| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |\\n|      |      |      |      |  2   |      |      |      |\\n|      |      |      |      |      |      |      |  3   |\\n|      |      |      |      |      |  4   |      |      |\\n|      |  5   |      |      |      |      |      |      |\\n|      |      |      |      |      |      |  6   |      |\\n|      |  7   |      |      |      |      |      |      |\\n|      |      |      |  8   |      |      |      |      |\\n\\n####\\t1.1 \u516b\u7687\u540e\u7684\u89c4\u5219\u6821\u9a8c\\n\\n```java\\n    /**\\n     * \u6821\u9a8c\u8be5\u7687\u540e\u662f\u5426\u548c\u524d\u9762\u7684\u7687\u540e\u51b2\u7a81\\n     *\\n     * @param index \u7b2c\u51e0\u4e2a\u7687\u540e(index\u8868\u793a\u5728\u6570\u7ec4\u7684\u7d22\u5f15)\\n     * @return \u8be5\u7687\u540e\u7684\u4f4d\u7f6e\u662f\u5426\u51b2\u7a81\\n     */\\n    public boolean isJudge(int index) {\\n        if (index == 0) {\\n            // \u5982\u679c\u662f\u5728\u6570\u7ec4\u7684\u7b2c\u4e00\u4e2a\u7687\u540e\u76f4\u63a5\u8fd4\u56de\u4e0d\u51b2\u7a81\\n            return true;\\n        }\\n        // \u904d\u5386\u8be5\u7687\u540e\u524d\u9762\u7684\u7687\u540e\\n        for (int i = 0; i < index; i++) {\\n            // 1. \u5224\u65ad\u8be5\u7687\u540e\u662f\u5426\u548c\u524d\u9762\u7684\u7687\u540e\u5728\u540c\u4e00\u5217\\n            if (array[index] == array[i]) {\\n                // \u5047\u5982array[0] = 0, array[1]=1, array[2] = 1\u90a3\u4e48\u8fd9\u4e2a\u5c31\u662f\u51b2\u7a81\u7684\\n                return false;\\n            }\\n            // 2. \u5224\u65ad\u8be5\u7687\u540e\u662f\u5426\u548c\u5176\u4ed6\u7684\u7687\u540e\u5728\u540c\u4e00\u6761\u659c\u7ebf\\n            // array = {0,1,2,3,4,5,6,7} , \u8fd98\u4e2a\u7687\u540e\u5728\u540c\u4e00\u6761\u659c\u7ebf, \u7531\u6b64\u53ef\u4ee5\u5f97\u5230, \u4ed6\u4eec\u7684\u5dee\u503c\u76f8\u7b49\u7684\\n            //  \u7b2c\u4e00\u4e2a\u7687\u540e\u5728\u7b2c\u4e00\u884c\u7b2c\u4e00\u5217, \u7b2c\u4e8c\u4e2a\u7687\u540e\u5728\u7b2c\u4e8c\u884c\u7b2c\u4e8c\u5217, \u7b2c\u4e09\u4e2a\u7687\u540e\u5728\u7b2c\u4e09\u884c\u7b2c\u4e09\u5217\\n            //  \u7531\u6b64\u53ef\u5f97\u7b2cn\u4e2a\u7687\u540e\u548cn-\u4e2a\u7687\u540e\u7684\u4f4d\u7f6e(index)\u7684\u5dee\u503c,\u7b49\u4e8e\u4ed6\u4eec\u6240\u5728y\u8f74(val)\u7684\u5dee\u503c\\n            if (Math.abs(array[index] - array[i]) == Math.abs(index - i)) {\\n                return false;\\n            }\\n            // 3. \u5224\u65ad\u662f\u5426\u5728\u540c\u4e00\u884c\u7531\u4e8e\u6211\u4eec\u5df2\u7ecf\u89c4\u5b9a\u597d\u4e86 array = {0 , 4, 7, 5, 2, 6, 1, 3},\\n            //    \u6bcf\u4e00\u4e2a\u7687\u540e\u7684\u4f4d\u7f6e\u7684\u884c\u5728 array[index] =val, \u7531index \u51b3\u5b9a,\u6240\u4ee5\u80af\u5b9a\u4e0d\u5728\u540c\u4e00\u884c\\n\\n        }\\n        return true;\\n    }\\n```\\n\\n####\\t1.2 \u653e\u5165\u7687\u540e\\n\\n```java\\n    /**\\n     * @param index \u7687\u540e\u5728\u6570\u7ec4\u7684\u4f4d\u7f6e(index)\\n     */\\n    public void putQueue(int index) {\\n        if (index == max) {\\n            // \u5f53index = max\u7684\u65f6\u5019, \u8868\u793a\u7687\u540e\u5df2\u7ecf\u653e\u4e868\u4e2a, \\n            num++;\\n            printQueue();\\n            return;\\n        }\\n\\n        for (int i = 0; i < max; i++) {\\n            // \u5c06\u7687\u540e\u653e\u5165\u6570\u7ec4, \u8fd9\u91cc\u7684i\u4ee3\u8868\u7687\u540e\u5728\u68cb\u76d8\u7684\u5217\\n            array[index] = i;\\n            if (isJudge(index)) {\\n                // \u4e0d\u51b2\u7a81, \u7ee7\u7eed\u653e\u5165\u7687\u540e\u5230\u6570\u7ec4\\n                putQueue(index + 1);\\n            }\\n            // \u51b2\u7a81\u7684\u8bdd, \u7ee7\u7eed\u5faa\u73af\u653e\u5165\u65b0\u7684\u7687\u540e\u5230\u6570\u7ec4(\u6539\u53d8\u5f53\u524d\u7687\u540e\u7684\u5217)\\n        }\\n    }\\n```\\n\\n####\\t1.3 \u5b8c\u6574\u4ee3\u7801\u5982\u4e0b\\n\\n```java\\n\\npublic class Queue8Demo {\\n\\n    //\u5b9a\u4e49\u4e00\u4e2amax\u8868\u793a\u5171\u6709\u591a\u5c11\u4e2a\u7687\u540e\\n    int max = 8;\\n    //\u5b9a\u4e49\u6570\u7ec4array, \u4fdd\u5b58\u7687\u540e\u653e\u7f6e\u4f4d\u7f6e\u7684\u7ed3\u679c,\u6bd4\u5982 arr = {0 , 4, 7, 5, 2, 6, 1, 3}\\n    int[] array = new int[max];\\n    // \u89e3\u6cd5\u8ba1\u6570\u5668\\n    static int num = 0;\\n    \\n    public static void main(String[] args) {\\n        long startTime = System.currentTimeMillis();\\n        Queue8Demo queue8 = new Queue8Demo();\\n        queue8.putQueue(0);\\n        System.out.println(\\"\u8017\u65f6:\\" + (System.currentTimeMillis() - startTime));\\n    }\\n\\n    /**\\n     * \u6821\u9a8c\u8be5\u7687\u540e\u662f\u5426\u548c\u524d\u9762\u7684\u7687\u540e\u51b2\u7a81\\n     *\\n     * @param index \u7b2c\u51e0\u4e2a\u7687\u540e(index\u8868\u793a\u5728\u6570\u7ec4\u7684\u7d22\u5f15)\\n     * @return \u8be5\u7687\u540e\u7684\u4f4d\u7f6e\u662f\u5426\u51b2\u7a81\\n     */\\n    public boolean isJudge(int index) {\\n        if (index == 0) {\\n            // \u5982\u679c\u662f\u5728\u6570\u7ec4\u7684\u7b2c\u4e00\u4e2a\u7687\u540e\u76f4\u63a5\u8fd4\u56de\u4e0d\u51b2\u7a81\\n            return true;\\n        }\\n        // \u904d\u5386\u8be5\u7687\u540e\u524d\u9762\u7684\u7687\u540e\\n        for (int i = 0; i < index; i++) {\\n            // 1. \u5224\u65ad\u8be5\u7687\u540e\u662f\u5426\u548c\u524d\u9762\u7684\u7687\u540e\u5728\u540c\u4e00\u5217\\n            if (array[index] == array[i]) {\\n                // \u5047\u5982array[0] = 0, array[1]=1, array[2] = 1\u90a3\u4e48\u8fd9\u4e2a\u5c31\u662f\u51b2\u7a81\u7684\\n                return false;\\n            }\\n            // 2. \u5224\u65ad\u8be5\u7687\u540e\u662f\u5426\u548c\u5176\u4ed6\u7684\u7687\u540e\u5728\u540c\u4e00\u6761\u659c\u7ebf\\n            // array = {0,1,2,3,4,5,6,7} , \u8fd98\u4e2a\u7687\u540e\u5728\u540c\u4e00\u6761\u659c\u7ebf, \u7531\u6b64\u53ef\u4ee5\u5f97\u5230, \u4ed6\u4eec\u7684\u5dee\u503c\u76f8\u7b49\u7684\\n            //  \u7b2c\u4e00\u4e2a\u7687\u540e\u5728\u7b2c\u4e00\u884c\u7b2c\u4e00\u5217, \u7b2c\u4e8c\u4e2a\u7687\u540e\u5728\u7b2c\u4e8c\u884c\u7b2c\u4e8c\u5217, \u7b2c\u4e09\u4e2a\u7687\u540e\u5728\u7b2c\u4e09\u884c\u7b2c\u4e09\u5217\\n            //  \u7531\u6b64\u53ef\u5f97\u7b2cn\u4e2a\u7687\u540e\u548cn-\u4e2a\u7687\u540e\u7684\u4f4d\u7f6e(index)\u7684\u5dee\u503c,\u7b49\u4e8e\u4ed6\u4eec\u6240\u5728y\u8f74(val)\u7684\u5dee\u503c\\n            if (Math.abs(array[index] - array[i]) == Math.abs(index - i)) {\\n                return false;\\n            }\\n            // 3. \u5224\u65ad\u662f\u5426\u5728\u540c\u4e00\u884c\u7531\u4e8e\u6211\u4eec\u5df2\u7ecf\u89c4\u5b9a\u597d\u4e86 array = {0 , 4, 7, 5, 2, 6, 1, 3},\\n            //    \u6bcf\u4e00\u4e2a\u7687\u540e\u7684\u4f4d\u7f6e\u7684\u884c\u5728 array[index] =val, \u7531index \u51b3\u5b9a,\u6240\u4ee5\u80af\u5b9a\u4e0d\u5728\u540c\u4e00\u884c\\n\\n        }\\n        return true;\\n    }\\n\\n\\n    /**\\n     * \u653e\u5165\u7687\u540e\u5230\u6570\u7ec4\\n     * @param index \u7687\u540e\u5728\u6570\u7ec4\u7684\u4f4d\u7f6e(index)\\n     */\\n    public void putQueue(int index) {\\n        if (index == max) {\\n            // \u5f53index = max\u7684\u65f6\u5019, \u8868\u793a\u7687\u540e\u5df2\u7ecf\u653e\u4e868\u4e2a,\u5df2\u7ecf\u5f97\u5230\u4e00\u79cd\u89e3\u6cd5\\n            num++;\\n            printQueue();\\n            return;\\n        }\\n\\n        for (int i = 0; i < max; i++) {\\n            // \u5c06\u7687\u540e\u653e\u5165\u6570\u7ec4, \u8fd9\u91cc\u7684i\u4ee3\u8868\u7687\u540e\u5728\u68cb\u76d8\u7684\u5217\\n            array[index] = i;\\n            if (isJudge(index)) {\\n                // \u4e0d\u51b2\u7a81, \u7ee7\u7eed\u653e\u5165\u7687\u540e\u5230\u6570\u7ec4\\n                putQueue(index + 1);\\n            }\\n            // \u51b2\u7a81\u7684\u8bdd, \u7ee7\u7eed\u5faa\u73af\u653e\u5165\u65b0\u7684\u7687\u540e\u5230\u6570\u7ec4(\u6539\u53d8\u5f53\u524d\u7687\u540e\u7684\u5217)\\n        }\\n    }\\n\\n    public void printQueue() {\\n        System.out.print(\\"\u89e3\u6cd5\\" + num + \\":\\");\\n        for (int i = 0; i < array.length; i++) {\\n            System.out.print(array[i]);\\n        }\\n        System.out.println();\\n    }\\n    \\n}\\n\\n```\\n\\n####\\t\\n\\n\\n\\n\\n\\n##\\t\u603b\u7ed3\\n\\n1.   \u901a\u8fc7\u9012\u5f52\u89e3\u51b3\u4e86\u516b\u7687\u540e\u7684\u89e3\u6cd5, \u5b66\u4e60\u9012\u5f52\u7684\u7528\u6cd5"},{"id":"josephu-question","metadata":{"permalink":"/data-structure-and-algorithm/josephu-question","source":"@site/data-structure-and-algorithm/2022-01-31-Josephu-questtion.md","title":"\u7ea6\u745f\u592b\u95ee\u9898\u8be6\u7ec6\u89e3\u6cd5","description":"\u7ea6\u745f\u592b\u95ee\u9898\u7684\u51e0\u79cd\u7b97\u6cd5","date":"2022-01-31T00:00:00.000Z","formattedDate":"January 31, 2022","tags":[{"label":"algorithm","permalink":"/data-structure-and-algorithm/tags/algorithm"}],"readingTime":4.98,"truncated":false,"authors":[{"name":"jeesk","title":"java engineer","url":"https://shanjiancaofu.com","imageURL":"https://shanjiancaofu.com/img/avtor.png","key":"jeesk"}],"frontMatter":{"slug":"josephu-question","title":"\u7ea6\u745f\u592b\u95ee\u9898\u8be6\u7ec6\u89e3\u6cd5","authors":["jeesk"],"tags":["algorithm"]},"prevItem":{"title":"\u516b\u7687\u540e\u95ee\u9898\u89e3\u51b3\u65b9\u6848\u8be6\u89e3","permalink":"/data-structure-and-algorithm/queue-8"}},"content":"##\\t\\t\u7ea6\u745f\u592b\u95ee\u9898\u7684\u51e0\u79cd\u7b97\u6cd5\\n>\u636e\u8bf4\u8457\u540d\u72b9\u592a\u5386\u53f2\u5b66\u5bb6Josephus\u6709\u8fc7\u4ee5\u4e0b\u7684\u6545\u4e8b\uff1a\u5728\u7f57\u9a6c\u4eba\u5360\u9886\u4e54\u5854\u5e15\u7279\u540e\uff0c39 \u4e2a\u72b9\u592a\u4eba\u4e0eJosephus\u53ca\u4ed6\u7684\u670b\u53cb\u8eb2\u5230\u4e00\u4e2a\u6d1e\u4e2d\uff0c39\u4e2a\u72b9\u592a\u4eba\u51b3\u5b9a\u5b81\u613f\u6b7b\u4e5f\u4e0d\u8981\u88ab\u654c\u4eba\u6293\u5230\uff0c\u4e8e\u662f\u51b3\u5b9a\u4e86\u4e00\u4e2a\u81ea\u6740\u65b9\u5f0f\uff0c41\u4e2a\u4eba\u6392\u6210\u4e00\u4e2a\u5706\u5708\uff0c\u7531\u7b2c1\u4e2a\u4eba\u5f00\u59cb\u62a5\u6570\uff0c\u6bcf\u62a5\u6570\u5230\u7b2c3\u4eba\u8be5\u4eba\u5c31\u5fc5\u987b\u81ea\u6740\uff0c\u7136\u540e\u518d\u7531\u4e0b\u4e00\u4e2a\u91cd\u65b0\u62a5\u6570\uff0c\u76f4\u5230\u6240\u6709\u4eba\u90fd\u81ea\u6740\u8eab\u4ea1\u4e3a\u6b62\u3002\u7136\u800cJosephus \u548c\u4ed6\u7684\u670b\u53cb\u5e76\u4e0d\u60f3\u9075\u4ece\u3002\u9996\u5148\u4ece\u4e00\u4e2a\u4eba\u5f00\u59cb\uff0c\u8d8a\u8fc7k-2\u4e2a\u4eba\uff08\u56e0\u4e3a\u7b2c\u4e00\u4e2a\u4eba\u5df2\u7ecf\u88ab\u8d8a\u8fc7\uff09\uff0c\u5e76\u6740\u6389\u7b2ck\u4e2a\u4eba\u3002\u63a5\u7740\uff0c\u518d\u8d8a\u8fc7k-1\u4e2a\u4eba\uff0c\u5e76\u6740\u6389\u7b2ck\u4e2a\u4eba\u3002\u8fd9\u4e2a\u8fc7\u7a0b\u6cbf\u7740\u5706\u5708\u4e00\u76f4\u8fdb\u884c\uff0c\u76f4\u5230\u6700\u7ec8\u53ea\u5269\u4e0b\u4e00\u4e2a\u4eba\u7559\u4e0b\uff0c\u8fd9\u4e2a\u4eba\u5c31\u53ef\u4ee5\u7ee7\u7eed\u6d3b\u7740\u3002\u95ee\u9898\u662f\uff0c\u7ed9\u5b9a\u4e86\u548c\uff0c\u4e00\u5f00\u59cb\u8981\u7ad9\u5728\u4ec0\u4e48\u5730\u65b9\u624d\u80fd\u907f\u514d\u88ab\u5904\u51b3\u3002Josephus\u8981\u4ed6\u7684\u670b\u53cb\u5148\u5047\u88c5\u9075\u4ece\uff0c\u4ed6\u5c06\u670b\u53cb\u4e0e\u81ea\u5df1\u5b89\u6392\u5728\u7b2c16\u4e2a\u4e0e\u7b2c31\u4e2a\u4f4d\u7f6e\uff0c\u4e8e\u662f\u9003\u8fc7\u4e86\u8fd9\u573a\u6b7b\u4ea1\u6e38\u620f\\n\\n\u73b0\u5728\u7b80\u5355\u7684\u4e3e\u4e2a\u4f8b\u5b50:\\n\\n\u5047\u5982\u4e00\u5171\u67098\u4e2a, \u4ece\u7b2c\u4e00\u4e2a\u5f00\u59cb\u62a5\u6570, \u7136\u540e\u6bcf\u6b21\u62a53\u4e2a\u4eba\u51fa\u5708\\n\\n1,2,3,4,5,6,7,8\\n\\n1.  1,2,3,4,5,6,7,8      3\u53f7\u51fa\u5708\\n2.  1,2,4,5,6,7,8         6\u53f7\u51fa\u5708\\n3.  1,2,4,5,7,8            1\u53f7\u51fa\u5708\\n4.   2,4,5,7,8               5\u53f7\u51fa\u5708\\n5.    2,4,7,8                 2\u53f7\u51fa\u5708\\n6.    4,7,8                    8\u53f7\u51fa\u5708\\n7.    4,7                       4\u53f7\u51fa\u5708\\n8. \u200b     7                         \\n\\n\u73b0\u5728\u5927\u5bb6\u5e94\u8be5\u662f\u660e\u767d\u4e86, \u7ea6\u745f\u592b\u7b97\u6cd5\u7684\u73a9\u6cd5, \u90a3\u4e48\u4e0b\u9762\u5206\u4eab\u51e0\u79cd\u4e0d\u540c\u601d\u8def\u7684\u89e3\u6cd5\\n\\n###\\t1. \u73af\u5f62\u94fe\u8868\u89e3\u6cd5\\n\\n####\\t\\t1.1\\t\u601d\u8def\u5206\u6790\\n\\n1.   \u9996\u5148\u662f\u62ff\u5230\u73af\u5f62\u94fe\u8868\u7684\u7b2c\u4e00\u4e2a\u6570\u636efirst , \u548c\u6700\u540e\u4e00\u4e2a\u6570\u636elast\\n2.   \u5728\u62a5\u6570\u7684\u65f6\u5019,  \u5faa\u73af\u62a5\u6570,  \u6bcf\u6b21first \u548clast \u79fb\u52a8(m-1)\u6b21, \u7136\u540e\u5220\u9664\u5f53\u524d\u8282\u70b9, \u76f8\u5f53\u4e8e\u51fa\u5708\\n3.   \u5f53\u8fc7first= last\u7684\u65f6\u5019, \u53ea\u6709\u6700\u540e\u4e00\u4e2a\u4eba\u4e86\\n\\n####\\t1.2 \u4ee3\u7801\u5b9e\u6218\\n\\n```java\\npackage com.shanjiancaofu;\\n\\npublic class JosephuQuestion {\\n    public static void main(String[] args) {\\n        LinkedCircle linkedCircle = new LinkedCircle();\\n        // \u589e\u52a08\u4e2a\u4eba, \u8ba1\u7b97\u51fa\u5708\u7684\u4eba\\n        linkedCircle.addEle(8);\\n        linkedCircle.calu(1, 3);\\n    }\\n\\n    public static class LinkedCircle {\\n        \\n        /**\\n         * @param startNo  \u4ece\u7b2c\u51e0\u4e2a\u4eba\u5f00\u59cb\u6570\\n         * @param countNum \u62a5\u6570\\n         */\\n        public void calu(int startNo, int countNum) {\\n            // \u627e\u5230\u6700\u540e\u4e00\u4e2a\u6570\u636e\\n            Element lastEle = first;\\n            while (true) {\\n                if (lastEle.getNext() == first) {\\n                    break;\\n                }\\n                lastEle = lastEle.getNext();\\n            }\\n\\n            // \u5c06lastEle\u548cfirst \u79fb\u52a8(startNo-1), \u8fd9\u91cc\u79fb\u52a8\u7684\u539f\u56e0\u662f\u56e0\u4e3a\u5b9e\u9645\u60c5\u51b5\u53ef\u80fd\u4e0d\u662f\u4ece\u7b2c\u4e00\u4e2a\u4eba\u5f00\u59cb\u62a5\u6570\\n            for (int i = 0; i < startNo - 1; i++) {\\n                lastEle = lastEle.getNext();\\n                first = first.next;\\n            }\\n\\n            // \u5faa\u73af\u62a5\u6570\\n            while (true) {\\n                if (lastEle == first) {\\n                    // \u53ea\u6709\u4e00\u4e2a\u6570\u636e\\n                    break;\\n                }\\n                // \u6267\u884c\u62a5\u6570, \u79fb\u52a8first\u6570\u636e,\u627e\u5230\u51fa\u5708\u7684\u4eba\\n                for (int i = 0; i < countNum - 1; i++) {\\n                    lastEle = lastEle.getNext();\\n                    first = first.next;\\n                }\\n                // \u5f97\u5230\u7684first \u5c31\u662f\u79fb\u9664\u5708\u7684\u4eba\\n                System.out.println(\\"\u79fb\u9664\u5708\u7684\u4ebaNO:\\" + first.getNo());\\n                first = first.next;\\n                lastEle.setNext(first);\\n            }\\n\\n        }\\n\\n\\n        private Element first;\\n\\n        /**\\n         * \u589e\u52a0\u51e0\u4e2a\u6570\u636e\\n         *\\n         * @param nums \u589e\u52a0\u7684\u6570\u636e\u4e2a\u6570\\n         */\\n        public void addEle(int nums) {\\n            if (nums <= 0) {\\n                System.out.println(\\"\u53c2\u6570\u5f02\u5e38\\");\\n                return;\\n            }\\n            // \u94fe\u8868\u7684\u6700\u540e\u4e00\u4e2a\u6570\u636e\\n            Element lastElement = null;\\n\\n            for (int i = 1; i <= nums; i++) {\\n                Element element = new Element();\\n                element.setNo(i);\\n                if (i == 1) {\\n                    // \u7b2c\u4e00\u4e2a\u6570\u636e\u662ffirst, \u5e76\u4e14first\u7684next\u4e5f\u662ffirst\u81ea\u5df1\\n                    first = element;\\n                    first.setNext(first);\\n                    lastElement = first;\\n                } else {\\n                    // \u5176\u4ed6\u7684\u6570\u636enext\u662ffirst,\\n                    element.next = first;\\n                    // \u8bbe\u7f6e\u4e0a\u4e00\u4e2a\u6570\u636e\u7684next\u662f\u6700\u540e\u4e00\u4e2a\u6570\u636e\\n                    lastElement.next = element;\\n                    // \u5e76\u4e14\u66f4\u65b0lastElelment\u4e3a\u6700\u540e\u4e00\u4e2a\u6570\u636e\\n                    lastElement = element;\\n                }\\n            }\\n        }\\n\\n\\n        /**\\n         * \u6570\u636e\\n         */\\n        public static class Element {\\n            // \u6570\u636e\u7f16\u53f7\\n            private int no;\\n            // \u4e0b\u4e00\u4e2a\u4e3a\u6570\u636e\\n            private Element next;\\n\\n            public int getNo() {\\n                return no;\\n            }\\n\\n            public void setNo(int no) {\\n                this.no = no;\\n            }\\n\\n            public Element getNext() {\\n                return next;\\n            }\\n\\n            public void setNext(Element next) {\\n                this.next = next;\\n            }\\n        }\\n    }\\n\\n}\\n\\n```\\n\\n####\\t\\t1.3 \u63a7\u5236\u53f0\u5982\u4e0b\\n\\n```\\n\u79fb\u9664\u5708\u7684\u4ebaNO:3\\n\u79fb\u9664\u5708\u7684\u4ebaNO:6\\n\u79fb\u9664\u5708\u7684\u4ebaNO:1\\n\u79fb\u9664\u5708\u7684\u4ebaNO:5\\n\u79fb\u9664\u5708\u7684\u4ebaNO:2\\n\u79fb\u9664\u5708\u7684\u4ebaNO:8\\n\u79fb\u9664\u5708\u7684\u4ebaNO:4\\n```"}]}')}}]);