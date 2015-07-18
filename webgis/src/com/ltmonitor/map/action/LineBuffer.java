package com.ltmonitor.map.action;

import java.util.List;

import com.ltmonitor.entity.Enclosure;
import com.ltmonitor.entity.LineBufferPoint;
import com.ltmonitor.entity.LineSegment;
import com.ltmonitor.entity.PointLatLng;

public class LineBuffer {
	
	 /*参数：(sx,sy),(ex,ey)分别是直线的起点和终点坐标，nwidth是缓冲区宽度，
     *NumbPerCircle是多边形近似描述圆时的多边形顶点数目，
     **Pointxy返回多边形顶点坐标数组，nType是获得缓冲区类型，0是两侧缓冲区，1是左侧缓冲，2是右侧缓冲
     *返回值：多边形顶点的数目
     *依赖函数：GetAngle()
    */
    public static int LineToRgn(double sx, double sy, double ex, double ey, double nwidth,
        int NumbPerCircle, List<PointLatLng> Pointxy, short nType)
    {

        double tempEx = ex;
        double tempEy = ey;

        if (ex < sx)
        {
            ex = sx;
            ey = sy;
            sx = tempEx;
            sy = tempEy;
        }

        int PointNumb = Math.max(4, NumbPerCircle * 2 / 2);       //近似描述圆时采用的定点数最小为
        //4
        double nAngle = (double)Math.PI * 2 / PointNumb;             //得到每个插入点的弧度
        double Angle1 = GetAngle(sx, sy, ex, ey);          //得到直线的弧度
        double BaseAngle1 = 0, BaseAngle2 = 0;
        int PointNumb1;

        if (0 == nType)//如果是双侧缓冲
        {
            PointNumb1 = PointNumb / 2;
        }

        else//如果是单侧缓冲
        {
            PointNumb1 = PointNumb / 4;
        }

        if (0 == nType)//如果是双侧缓冲
        {
            BaseAngle1 = Math.PI / 2;
            BaseAngle2 = -Math.PI / 2;
        }
        else if (1 == nType) //如果是左侧缓冲
        {
            BaseAngle1 = Math.PI / 2;
            BaseAngle2 = 0;
        }
        else if (2 == nType) //如果是右侧缓冲
        {
            BaseAngle1 = Math.PI;
            BaseAngle2 = -Math.PI / 2;
        }

        int sm = 0;       //记录直线缓冲区顶点的个数

        for (int i = 0; i <= PointNumb1; i++)  //对所有顶点循环，得到所有起点
        //的各个圆的插入点坐标
        {
            double angle = Angle1 + BaseAngle1 + nAngle * i;
            double lng = sx + nwidth * (double)Math.cos(angle);
            double lat = sy + nwidth * (double)Math.sin(angle);
            Pointxy.add(new PointLatLng(lng, lat));
        }

        for (int i = 0; i <= PointNumb1; i++)  //对所有顶点循环，得到所有终点
        //的各个圆的插入点坐标
        {
            double angle = Angle1 + BaseAngle2 + nAngle * i;   //顶点所在的弧度
            double lng = ex + nwidth * (double)Math.cos(angle);
            double lat = ey + nwidth * (double)Math.sin(angle);
            Pointxy.add(new PointLatLng(lng, lat));
        }

        //Pointxy[sm++] = Pointxy[0];
        return sm;
    }
    /*函数功能： 得到直线的弧度
     *参数：(sx,sy),(ex,ey)分别是直线的起点和终点坐标
     *返回值：直线的弧度
     *依赖函数：无
     */
    static double GetAngle(double sx, double sy, double ex, double ey)
    {
        double k = (ey - sy) / (ex - sx);                       //得到直线斜率
        double angle = Math.atan(k);                         //通过直线斜率得到直线对应的弧度
        return angle;                               //返回弧度
    }
	 /**
     * 创建缓冲区
     */
/**
    private List<LineBufferPoint> CreateLineBuffer(Enclosure ef, List<LineSegment> segments)
    {
        List<LineBufferPoint> lineBufferPoints = new List<LineBufferPoint>();
        if (segments.Count > 0)
        {
            for (int m = 0; m < segments.Count - 1; m++)
            {
                LineSegment seg = segments[m];
                List<PointLatLng> ls = new List<PointLatLng>();
                PointLatLng pl1 = new PointLatLng(seg.Latitude1, seg.Longitude1);
                PointLatLng pl2 = new PointLatLng(seg.Latitude2, seg.Longitude2);
                GMap.NET.GPoint gp1 = this.gMapControl1.FromLatLngToLocal(pl1);
                GMap.NET.GPoint gp2 = this.gMapControl1.FromLatLngToLocal(pl2);
                List<NPoint> points = new List<NPoint>();

                int nWidth = (int)getScale(seg.LineWidth / 2); //缓冲区宽度为50m
                LineBuffer.LineToRgn(gp1.X, gp1.Y, gp2.X, gp2.Y, nWidth, 20, ref points, 0);
                //PointLatLng gp1 = pointList[m];
                //PointLatLng gp2 = pointList[m+1];
                //LineBuffer.LineToRgn(gp1.Lng, gp1.Lat, gp2.Lng, gp2.Lat, 2, 6, ref points, 0);
                foreach (NPoint np in points)
                {
                    ls.Add(this.gMapControl1.FromLocalToLatLng((int)np.x, (int)np.y));
                   // ls.Add(new PointLatLng(np.y, np.x));
                }
                foreach (PointLatLng dp in ls)
                {
                    LineBufferPoint lp = new LineBufferPoint(seg.EntityId, dp.Lng, dp.Lat);
                    lineBufferPoints.Add(lp);
                }
                
                GMapPolygon gp = new GMapPolygon(ls, "");
                gp.Stroke = new Pen(Color.Blue, 1);
                gp.IsHitTestVisible = true;
                gp.Stroke.DashStyle = System.Drawing.Drawing2D.DashStyle.Dot;
                gp.Tag = ef;
                gp.Fill = new SolidBrush(Color.Transparent);
                GetOverlay(LayerConstants.LAYER_ENCLOSURE).Polygons.Add(gp);
            }

        }
        return lineBufferPoints;
    }
    */
    
}

 

