import { useState, useRef, useCallback, useEffect } from "react";
import { Switch, Typography } from "antd";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  OnConnect,
  NodeProps,
  NodeTypes,
  Handle,
  Position,
  // Controls,
} from "reactflow";

import "reactflow/dist/style.css";

const { Title } = Typography;

// Define your node data interface
interface MyNodeData {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  backgroundColor?: string;
  text?: React.ReactNode;
}

// Custom node component with Switch for nodes 2 and 3
const FifteenNode = ({
  data,
}: NodeProps<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
  backgroundColor: string;
}>) => {
  return (
    <div
      style={{
        padding: 10,
        background: data.backgroundColor,
        border: "1px solid #bfbfbf",
        borderRadius: 5,
        width: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Input Handle on the top */}
      <Handle type="target" position={Position.Top} />

      <div style={{ marginBottom: 10, textAlign: "center" }}>{data.text}</div>

      <Switch
        checkedChildren="Yes"
        unCheckedChildren="No"
        checked={data.checked}
        onChange={data.onChange}
      />

      {/* Output Handle on the bottom */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes: NodeTypes = {
  FifteenNode,
};

const initialNodes: Node<MyNodeData>[] = [
  {
    id: "1",
    type: "input",
    data: {
      backgroundColor: "#b5f5ec",
      label: (
        <>
          Let's assess an employee's <strong>eligibility</strong>
        </>
      ),
    },
    position: { x: 447, y: -320 },
  },
  {
    id: "2",
    type: "FifteenNode",
    position: { x: 171, y: -200 },
    data: {
      text: (
        <>
          <Title level={5}>50% Rule</Title>
          Did the employee spend 50% or more of their time on the R&D qualifying
          project?
        </>
      ),
      backgroundColor: "#b5f5ec",
      checked: true,
      onChange: () => {},
    },
  },
  {
    id: "3",
    type: "FifteenNode",
    position: { x: 590, y: -200 },
    data: {
      text: (
        <>
          <Title level={5}>15 Hours Rule</Title>
          Does the employee’s R&D working time amount to 15 hours or more???
        </>
      ),
      backgroundColor: "#ffd6e7",
      checked: false,
      onChange: () => {},
    },
  },
  {
    id: "4",
    type: "output",
    data: {
      label: <></>, // Dynamic content here
    },
    position: { x: 330, y: 30 },
    style: {
      background: "#D6D5E6",
      color: "#333",
      border: "1px solid #222138",
      width: 400,
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
      lineHeight: 1.4,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: {
      stroke: "#13c2c2",
      strokeWidth: 2,
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#eb2f96", strokeWidth: 2 },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    style: { stroke: "#595959", strokeWidth: 2 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#595959", strokeWidth: 2 },
  },
];

let id = 0;
const getId = (): string => `dndnode_${id++}`;

export default function App(): JSX.Element {
  const [fifteenChecked, setFifteenChecked] = useState(true);
  const [fiftyChecked, setFiftyChecked] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // Initialize nodes with updated data (including handlers and checked state)
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => {
      if (node.id === "2") {
        return {
          ...node,
          data: {
            text: (
              <>
                <Title level={5}>50% Rule</Title>
                Did the employee spend 50% or more of their time on the R&D
                qualifying project?
              </>
            ),
            backgroundColor: "#b5f5ec",
            checked: fifteenChecked,
            onChange: setFifteenChecked,
          },
        };
      }
      if (node.id === "3") {
        return {
          ...node,
          data: {
            text: (
              <>
                <Title level={5}>15 Hours Rule</Title>
                Does the employee’s R&D working time amount to 15 hours or
                more???
              </>
            ),
            backgroundColor: "#ffd6e7",
            checked: fiftyChecked,
            onChange: setFiftyChecked,
          },
        };
      }
      return node;
    })
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onInit = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<MyNodeData> = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Keep node data updated with latest switch states, including dynamic output node content
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "2") {
          return {
            ...node,
            data: {
              text: (
                <>
                  <Title level={5}>50% Rule</Title>
                  Did the employee spend 50% or more of their time on the R&D
                  qualifying project?
                </>
              ),
              backgroundColor: "#b5f5ec",
              checked: fiftyChecked,
              onChange: setFiftyChecked,
            },
          };
        }
        if (node.id === "3") {
          return {
            ...node,
            data: {
              text: (
                <>
                  <Title level={5}>15 Hours Rule</Title>
                  Does the employee’s R&D working time amount to 15 hours or
                  more???
                </>
              ),
              backgroundColor: "#ffd6e7",
              checked: fifteenChecked,
              onChange: setFifteenChecked,
            },
          };
        }
        if (node.id === "4") {
          return {
            ...node,
            data: {
              ...node.data,
              label: constructDecision(),
            },
          };
        }
        return node;
      })
    );
  }, [fifteenChecked, fiftyChecked, setNodes]);
  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 }); // optional padding for spacing
    }
  }, [reactFlowInstance]);

  const constructDecision = () => {
    if (!fiftyChecked) {
      return (
        <>
          The employee broke the fifty percent rule and therefore does not
          qualify, regardless of the second criterion. It is important to always
          remember that failing to meet the <strong>fifty percent rule</strong>{" "}
          alone disqualifies the employee from eligibility, no matter what the
          other criteria indicate.
        </>
      );
    }
    if (fifteenChecked && fiftyChecked) {
      return (
        <>
          The employee qualifies because he or she meets both criteria: spending
          at least <strong>50% of their working time</strong> on the qualifying
          R&D project, and working a <strong>minimum of 15 hours</strong> on it.
          Both conditions must be satisfied for eligibility.
        </>
      );
    }
    if (fiftyChecked && !fifteenChecked) {
      return (
        <>
          The employee satisfies the 50% rule; however, they break the minimum
          15-hour rule, which normally disqualifies them. Nonetheless, there is
          a possibility that they could qualify under an exception known as the{" "}
          <strong>"exception rule," </strong> which we have not yet covered but
          will discuss in the next section.
        </>
      );
    }
    return <></>; // fallback empty if none match
  };

  return (
    <div className="dndflow" style={{ height: "650px" }}>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          style={{ height: 600, width: 800 }}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            maxZoom={1}
            minZoom={1}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onWheelCapture={(event) => {
              event.stopPropagation();
            }}
            zoomOnScroll={false} // disable zoom on scroll
            zoomOnPinch={false} // disable zoom on pinch (touch devices)
            panOnDrag={false} // disable pan when dragging background
            panOnScroll={false} // disable pan on scroll
            zoomOnDoubleClick={false} // disable zoom on double-click
            nodesDraggable={false} // disable dragging nodes
            nodesConnectable={false} // disable connecting nodes
            // elementsSelectable={false} // disable selecting nodes and edges
          >
            {/* <Controls /> */}
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
