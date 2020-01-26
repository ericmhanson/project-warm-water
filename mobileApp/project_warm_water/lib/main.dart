import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        //brightness: Brightness.dark,
        primaryColor: Color(0xFF6DA3c7),
        accentColor: Color(0xFF9fd4fa),
      ),
      home: MyHomePage(title: 'Project Warm Water'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final CollectionReference fireData = Firestore.instance.collection('users');

  @override
  Widget build(BuildContext context) {
    Future.delayed(Duration.zero, () => showAlert(context));

    return Scaffold(
        appBar: AppBar(
          // Here we take the value from the MyHomePage object that was created by
          // the App.build method, and use it to set our appbar title.
          title: Text(widget.title),
        ),
        body: ListView(
          children: <Widget>[
//            StreamBuilder<void>(
//              stream: fireData.snapshots(),
//              builder: (BuildContext context, AsyncSnapshot snapshot) {
//                Widget widget;
//                if (snapshot.hasData) {
//                  List<ChartData> chartData = <ChartData>[];
//                  for (int index = 0;
//                      index < snapshot.data.documents.length;
//                      index++) {
//                    DocumentSnapshot documentSnapshot =
//                        snapshot.data.documents[index];
//
//                    // here we are storing the data into a list which is used for chart’s data source
//                    chartData.add(ChartData.fromMap(documentSnapshot.data));
//                  }
//                  widget = Container(
//                      child: SfCartesianChart(
//                    title: ChartTitle(text: 'Waterloss for Heating'),
//                    primaryXAxis: DateTimeAxis(
//                      title: AxisTitle(text: 'Minute'),
//                    ),
//                    //primaryYAxis:
//                    //    CategoryAxis(title: AxisTitle(text: 'Minute')),
//                    tooltipBehavior: TooltipBehavior(enable: true),
//                    series: <ChartSeries<ChartData, dynamic>>[
//                      ColumnSeries<ChartData, dynamic>(
//                          dataSource: chartData,
//                          xValueMapper: (ChartData data, _) => data.xValue,
//                          yValueMapper: (ChartData data, _) => data.yValue),
//                    ],
//                  ));
//                }
//                return widget;
//              },
//            ),
            //Divider(
            //  color: Colors.black,
            //),
            StreamBuilder<void>(
              stream: fireData.snapshots(),
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                Widget widget;
                if (snapshot.hasData) {
                  List<T2sData> t2sData = <T2sData>[];
                  for (int index = 0;
                      index < snapshot.data.documents.length;
                      index++) {
                    DocumentSnapshot documentSnapshot =
                        snapshot.data.documents[index];

                    // here we are storing the data into a list which is used for chart’s data source
                    t2sData.add(T2sData.fromMap(documentSnapshot.data));
                  }
                  widget = Container(
                      child: SfCartesianChart(
                    title: ChartTitle(text: 'Waterloss during Shower (gal)'),
                    palette: <Color>[Colors.teal],
                    primaryXAxis: DateTimeAxis(
                      title: AxisTitle(text: 'Date'),
                    ),
                    //primaryYAxis:
                    //    CategoryAxis(title: AxisTitle(text: 'Minute')),
                    tooltipBehavior: TooltipBehavior(enable: true),
                    series: <ChartSeries<T2sData, dynamic>>[
                      ColumnSeries<T2sData, dynamic>(
                          dataSource: t2sData,
                          xValueMapper: (T2sData data, _) => data.xValue,
                          yValueMapper: (T2sData data, _) => data.yValue),
                    ],
                  ));
                }
                return widget;
              },
            ),
//            //Divider(
//            //  color: Colors.black,
//            //),
            StreamBuilder<void>(
              stream: fireData.snapshots(),
              builder: (BuildContext context, AsyncSnapshot snapshot) {
                Widget widget;
                if (snapshot.hasData) {
                  List<Time2heatData> time2heatData = <Time2heatData>[];
                  for (int index = 0;
                      index < snapshot.data.documents.length;
                      index++) {
                    DocumentSnapshot documentSnapshot =
                        snapshot.data.documents[index];

                    // here we are storing the data into a list which is used for chart’s data source
                    time2heatData
                        .add(Time2heatData.fromMap(documentSnapshot.data));
                  }
                  widget = Container(
                      child: SfCartesianChart(
                    title: ChartTitle(text: 'Time to Heat Water (seconds)'),
                    palette: <Color>[Colors.red],
                    primaryXAxis: DateTimeAxis(
                      title: AxisTitle(text: 'Date'),
                    ),
                    //primaryYAxis:
                    //    CategoryAxis(title: AxisTitle(text: 'Minute')),
                    tooltipBehavior: TooltipBehavior(enable: true),
                    series: <ChartSeries<Time2heatData, dynamic>>[
                      ColumnSeries<Time2heatData, dynamic>(
                          dataSource: time2heatData,
                          xValueMapper: (Time2heatData data, _) => data.xValue,
                          yValueMapper: (Time2heatData data, _) => data.yValue),
                    ],
                  ));
                }
                return widget;
              },
            ),
            //Divider(
            //  color: Colors.black,
            //),
//            StreamBuilder<void>(
//              stream: fireData.snapshots(),
//              builder: (BuildContext context, AsyncSnapshot snapshot) {
//                Widget widget;
//                if (snapshot.hasData) {
//                  List<Time2showerData> time2showerData = <Time2showerData>[];
//                  for (int index = 0;
//                      index < snapshot.data.documents.length;
//                      index++) {
//                    DocumentSnapshot documentSnapshot =
//                        snapshot.data.documents[index];
//
//                    // here we are storing the data into a list which is used for chart’s data source
//                    time2showerData
//                        .add(Time2showerData.fromMap(documentSnapshot.data));
//                  }
//                  widget = Container(
//                      child: SfCartesianChart(
//                    title: ChartTitle(text: 'Time to Shower'),
//                    palette: <Color>[Colors.greenAccent],
//                    primaryXAxis: DateTimeAxis(
//                      title: AxisTitle(text: 'Date'),
//                    ),
//                    //primaryYAxis:
//                    //    CategoryAxis(title: AxisTitle(text: 'Minute')),
//                    tooltipBehavior: TooltipBehavior(enable: true),
//                    series: <ChartSeries<Time2showerData, dynamic>>[
//                      ColumnSeries<Time2showerData, dynamic>(
//                          dataSource: time2showerData,
//                          xValueMapper: (Time2showerData data, _) =>
//                              data.xValue,
//                          yValueMapper: (Time2showerData data, _) =>
//                              data.yValue),
//                    ],
//                  ));
//                }
//                return widget;
//              },
//            ),
          ],
        ));
  }

  void showAlert(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text("Did you know?!"),
        content: Text(
            "Showering, bathing and using the toilet account for about two-thirds of the average family’s water usage."),
        actions: <Widget>[
          FlatButton(
            child: Text('Wow, Ok'),
            onPressed: () {
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
    );
  }
}

class ChartData {
  ChartData({this.xValue, this.yValue});
  ChartData.fromMap(Map<String, dynamic> dataMap)
      : xValue = dataMap['time'],
        yValue = dataMap['t2hig'];
  final Timestamp xValue;
  final double yValue;
}

class T2sData {
  T2sData({this.xValue, this.yValue});
  T2sData.fromMap(Map<String, dynamic> dataMap)
      : xValue = dataMap['time'],
        yValue = dataMap['t2sig'];
  final Timestamp xValue;
  final double yValue;
}

class Time2heatData {
  Time2heatData({this.xValue, this.yValue});
  Time2heatData.fromMap(Map<String, dynamic> dataMap)
      : xValue = dataMap['time'],
        yValue = dataMap['time2heat'];
  final Timestamp xValue;
  final double yValue;
}

class Time2showerData {
  Time2showerData({this.xValue, this.yValue});
  Time2showerData.fromMap(Map<String, dynamic> dataMap)
      : xValue = dataMap['time'],
        yValue = dataMap['time2shower'];
  final Timestamp xValue;
  final double yValue;
}
